<script>
    import Studio from '$lib/studio/Studio.svelte';
//  props we can access {children, data, form} 
let { children } = $props();
// import '../app.css';
</script>

<Studio />

{@render children?.()}