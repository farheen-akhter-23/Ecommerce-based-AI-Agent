import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from .models import Interaction, Product, Profile

def recommend_products(target_user, role):
    # Step 1: Fetch interaction data from the database
    interactions = Interaction.objects.all()

    # Step 2: Create a list of dictionaries for the interactions
    interaction_list = [
        {
            "user_id": interaction.user.username,  # Use username as user_id
            "product_id": interaction.product.id,
            "interaction": 1  # Assume all interactions are equal for simplicity
        }
        for interaction in interactions
    ]

    # Step 3: Convert to a DataFrame
    df = pd.DataFrame(interaction_list)

    # Step 4: Create a user-product interaction matrix
    user_product_matrix = df.pivot_table(index="user_id", columns="product_id", values="interaction", fill_value=0)

    # Step 5: Compute user similarity using cosine similarity
    user_similarity = cosine_similarity(user_product_matrix)
    user_similarity_df = pd.DataFrame(user_similarity, index=user_product_matrix.index, columns=user_product_matrix.index)

    # Step 6: Find similar users based on role
    similar_users = user_similarity_df[target_user].sort_values(ascending=False).index[1:]  # Exclude the target user

    # Step 7: Filter similar users by role
    similar_users_same_role = [
        user for user in similar_users
        if Profile.objects.get(user__username=user).role == role
    ]

    # Step 8: Find products similar users have interacted with
    recommended_products = user_product_matrix.loc[similar_users_same_role].sum().sort_values(ascending=False)

    # Step 9: Exclude products the target user has already interacted with
    already_interacted = user_product_matrix.loc[target_user] == 1
    recommended_products = recommended_products[~already_interacted]

    # Step 10: Get product details for the recommended products
    recommended_product_ids = recommended_products.index.tolist()
    recommended_products = Product.objects.filter(id__in=recommended_product_ids)

    return recommended_products