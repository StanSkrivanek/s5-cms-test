<script>
	const { data } = $props();
	$inspect('Recipe data', data);
	let recipe = data.recipe;
</script>

<div class="container">
	{#if !recipe}
		<p>Recipe not found</p>
	{:else}
		<div class="recipe-detail">
			<div class="recipe-header">
				<h1>{recipe.title}</h1>

				<div class="recipe-meta">
					<div class="cuisine-info">
						{#if recipe.cuisineFlag && recipe.cuisineFlag.asset}
							<img src={recipe.cuisineFlag.asset.url} alt="Flag" class="flag-icon" />
						{/if}
						{#if recipe.cuisineInfo}<span>{recipe.cuisineInfo}</span>{/if}
					</div>
					{#if recipe.mealTypeName}<span class="meal-type">{recipe.mealTypeName}</span>{/if}
				</div>
			</div>

			<div class="recipe-image-container">
				{#if recipe.image}
					<img src={recipe.image} alt={recipe.title} class="recipe-detail-image" />
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

			<div class="recipe-times">
				{#if recipe.prepTime}<div><strong>Prep Time:</strong> {recipe.prepTime} minutes</div>{/if}
				{#if recipe.cookTime}<div><strong>Cook Time:</strong> {recipe.cookTime} minutes</div>{/if}
				{#if recipe.prepTime && recipe.cookTime}
					<div>
						<strong>Total Time:</strong>
						{parseInt(recipe.prepTime) + parseInt(recipe.cookTime)} minutes
					</div>
				{/if}
			</div>

			<!-- Ingredients Section -->
			{#if recipe.ingredients && recipe.ingredients.length > 0}
				<div class="recipe-section">
					<h2>Ingredients</h2>
					<ul class="ingredients-list">
						{#each recipe.ingredients as ingredient}
							<li>{ingredient}</li>
						{/each}
					</ul>
				</div>
			{/if}

			<!-- Instructions Section -->
			{#if recipe.instructions && recipe.instructions.length > 0}
				<div class="recipe-section">
					<h2>Instructions</h2>
					<ol class="instructions-list">
						{#each recipe.instructions as block}
							{#if block._type === 'block' && block.listItem === 'number'}
								<li>
									{#each block.children as child}
										{child.text}
									{/each}
								</li>
							{/if}
						{/each}
					</ol>
				</div>
			{/if}

			<div class="recipe-actions">
				<a href="/" class="button-back">← Back to All Recipes</a>
			</div>
		</div>
	{/if}
</div>

<style>
	.container {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.recipe-detail {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.recipe-header {
		text-align: center;
	}

	h1 {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}

	.recipe-meta {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.cuisine-info {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.flag-icon {
		width: 1.5rem;
		border-radius: 0.125rem;
	}

	.meal-type {
		padding: 0.25rem 0.75rem;
		background-color: #c8e6fa;
		border-radius: 0.25rem;
		font-size: 0.875rem;
	}

	.recipe-image-container {
		position: relative;
		width: 100%;
		max-height: 500px;
		overflow: hidden;
		border-radius: 0.5rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.recipe-detail-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.no-image {
		width: 100%;
		height: 300px;
		background-color: #edf2f7;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.featured-badge {
		position: absolute;
		top: 24px;
		left: 24px;
		z-index: 1;
	}

	.featured-badge span {
		background-color: #fefcbf;
		color: #975a16;
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		border-radius: 0 0.25rem 0.25rem 0;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		font-weight: 600;
	}

	.recipe-times {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 1rem;
		padding: 1rem;
		border-radius: 0.5rem;
		background-color: #f7fafc;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.recipe-actions {
		display: flex;
		justify-content: center;
		margin-top: 1rem;
	}

	.button-back {
		display: inline-block;
		padding: 0.5rem 1.5rem;
		background-color: #3182ce;
		color: white;
		border-radius: 0.25rem;
		text-decoration: none;
		font-weight: 600;
		transition: background-color 0.2s;
	}

	.button-back:hover {
		background-color: #2c5282;
	}

	@media (max-width: 640px) {
		h1 {
			font-size: 1.75rem;
		}
	}

	.recipe-section {
		background-color: #ffffff;
		padding: 1.5rem;
		border-radius: 0.5rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		margin-top: 1rem;
	}

	h2 {
		font-size: 1.8rem;
		font-weight: 600;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid #e2e8f0;
	}

	.instructions-list {
		padding-left: 2rem;
		margin-top: 1rem;
	}

	.instructions-list li {
		margin-bottom: 1rem;
		line-height: 1.6;
	}

	.ingredients-list {
		list-style-type: disc;
		padding-left: 2rem;
		margin-top: 1rem;
	}

	.ingredients-list li {
		margin-bottom: 0.5rem;
		line-height: 1.6;
	}
</style>
