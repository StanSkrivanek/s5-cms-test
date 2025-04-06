<script>
    import Studio from '$lib/studio/Studio.svelte';
//  props we can access {children, data, form} 
let { children } = $props();
// import '../app.css';
</script>

<Studio />
 <!-- only to avoid the server error that `@render` is not found -->
  <!-- children?.() -> optional only if children exists -->

{@render children?.()}