<script>
    import Studio from '$lib/studio/Studio.svelte';
    import { browser } from '$app/environment';
    // props we can access {children, data, form} 
    // let { children } = $props();
    // import '../app.css';
    // children = children || (() => null);
</script>



    <Studio />

 <!-- only to avoid the server error that `@render` is not found -->
  <!-- children?.() -> optional only if children exists, preventing errors when it's null or undefined -->


