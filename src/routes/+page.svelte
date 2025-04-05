<script>
	const { data } = $props();
	$inspect('data', data); // Added logging for debugging purposes
	let loading = data.isLoading;
</script>

<!-- render all recipes -->
<div class="container">
	<h1>Our Recipes</h1>

	{#if loading}
		<p>Loading recipes...</p>
	{:else}
		<div class="recipe-grid">
			{#each data.recipes as recipe}
				<a href="/{recipe.slug}" class="recipe-card">
					<div class="image-container">
						{#if recipe.image}
							<img src={recipe.image} alt={recipe.title} class="recipe-image" />
						{:else}
							<div class="no-image">
								<span>No image</span>
							</div>
						{/if}

						{#if recipe.featured}
							<div class="featured-badge">
								<span>Featured</span>
							</div>
						{/if}
					</div>

					<div class="recipe-content">
						<h2>{recipe.title}</h2>

						<div class="recipe-meta">
							<div class="cuisine">
								{#if recipe.cuisineFlag && recipe.cuisineFlag.asset}
									<img src={recipe.cuisineFlag.asset.url} alt="" class="flag-icon" />
								{/if}
								{#if recipe.cuisineInfo}<span>{recipe.cuisineInfo}</span>{/if}
							</div>
							{#if recipe.mealTypeName}<span class="meal-type">{recipe.mealTypeName}</span>{/if}
						</div>

						<div class="recipe-times">
							{#if recipe.prepTime}<div>Prep: {recipe.prepTime} min</div>{/if}
							{#if recipe.cookTime}<div>Cook: {recipe.cookTime} min</div>{/if}
						</div>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	h1 {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 2rem;
		text-align: center;
	}

	.recipe-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
	}

	.recipe-card {
		border: 1px solid #e2e8f0;
		border-radius: 0.5rem;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		text-decoration: none;
		color: inherit;
	}

	.recipe-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
	}

	.image-container {
		position: relative;
		width: 100%;
	}

	.recipe-image {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}

	.no-image {
		width: 100%;
		height: 200px;
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
		margin-bottom: 0.5rem;
	}

	.cuisine {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.flag-icon {
		width: 1.5rem;
		border-radius: 0.125rem;
	}

	.meal-type {
		padding: 0.25rem 0.5rem;
		background-color: #c8e6fa;
		border-radius: 0.25rem;
		font-size: 0.75rem;
	}

	.featured-badge {
		position: absolute;
		top: 12px;
		left: 12px;
		z-index: 1;
	}

	.featured-badge span {
		background-color: #c4febf;
		color: #1c490b;
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		border-radius: 0 0.25rem 0.25rem 0;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.recipe-times {
		display: flex;
		gap: 1rem;
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: #4a5568;
	}

	@media (max-width: 640px) {
		.recipe-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
