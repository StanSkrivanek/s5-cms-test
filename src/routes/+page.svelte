<script>
const { data } = $props();
// $inspect('data', data); // Added logging for debugging purposes
let loading = data.isLoading
</script>

<!-- render all recipes -->

<!-- {#each data.recipes as recipe}
  <h1>{recipe.title}</h1>
  <img src={recipe.image} alt={recipe.title} />
  <p>{recipe.description}</p>
{/each} -->

<div class="container">
	<h1>Our Recipes</h1>

	{#if loading}
		<p>Loading recipes...</p>
	<!-- {:else if error}
		<p class="error">Error: {error}</p>
	{:else if recipes.length === 0}
		<p>No recipes found. Start adding some in your Sanity Studio!</p> -->
	{:else}
		<div class="recipe-grid">
			{#each data.recipes as recipe}
      	<div class="recipe-card">
					{#if recipe.image}
						<img src={recipe.image} alt={recipe.title} class="recipe-image" />
					{:else}
						<div class="no-image">
							<span>No image</span>
						</div>
					{/if}

					<div class="recipe-content">
						<h2>{recipe.title}</h2>

						<div class="recipe-meta">
							<div class="cuisine-info">
								{#if recipe.cuisineFlag && recipe.cuisineFlag.asset}
									<img src={recipe.cuisineFlag.asset.url} alt="Flag" class="flag-icon" />
								{/if}
								{#if recipe.cuisineInfo}<span>{recipe.cuisineInfo}</span>{/if}
							</div>
							{#if recipe.mealTypeName}<span class="meal-type">{recipe.mealTypeName}</span>{/if}
						</div>

						<div class="recipe-time">
							{#if recipe.prepTime}<div>Prep: {recipe.prepTime} min</div>{/if}
							{#if recipe.cookTime}<div>Cook: {recipe.cookTime} min</div>{/if}
						</div>

						{#if recipe.featured}
							<div class="featured-badge">
								<span>Featured</span>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>



<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 1rem;
	}

	h1 {
		font-size: 1.875rem;
		font-weight: bold;
		margin-bottom: 1.5rem;
	}

	/* .error {
		color: #e53e3e;
	} */

	.recipe-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 768px) {
		.recipe-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (min-width: 1024px) {
		.recipe-grid {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	.recipe-card {
		border: 1px solid #e2e8f0;
		border-radius: 0.5rem;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.recipe-image {
		width: 100%;
		height: 12rem;
		object-fit: cover;
	}

	.no-image {
		width: 100%;
		height: 12rem;
		background-color: #edf2f7;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.recipe-content {
		padding: 1rem;
	}

	h2 {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.recipe-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.875rem;
		color: #4a5568;
		margin-bottom: 0.5rem;
	}

	.meal-type {
		margin-right: 0.75rem;
	}

	.cuisine-info {
		display: flex;
		align-items: center;
	}

	.flag-icon {
		width: 1.25rem;
		height: 1.25rem;
		margin-right: 0.25rem;
		object-fit: cover;
		border-radius: 0.125rem;
	}

	.recipe-time {
		display: block;
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
	}

	.featured-badge {
		margin-top: 0.5rem;
	}

	.featured-badge span {
		background-color: #fefcbf;
		color: #975a16;
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
	}
</style>
