<script>
  import { onMount } from 'svelte';
  
  let artists = [];

  const getArtists = async () => {
    artists = [];
    const res = await fetch('/.netlify/functions/all-artists');
    console.log(res);

    const { allArtists } = await res.json();
    
    return allArtists.data;
  };
  
  onMount(async () => {
    artists = await getArtists();
  });
  
</script>

<h2>Response to the test query follows:</h2>
<ul>
  {#each artists as artist}
    <li>
      {artist.name} (ref: {artist._id})
    </li>
  {/each}
</ul>