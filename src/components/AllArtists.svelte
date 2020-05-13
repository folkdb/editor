<script>
  import { onMount } from 'svelte';
  
  let artists = [];

  const getArtists = async () => {
    artists = [];
    const res = await fetch('/.netlify/functions/all-artists');
    const json = await res.json();
    console.log(json);
    
    return json.map((item) => ({
      id: item.ref['@ref'].id,
      name: item.data.name,
    });
  };
  
  onMount(async () => {
    artists = await getArtists();
  });
  
</script>

<h2>Response to the test query follows:</h2>
<ul>
  {#each artists as artist}
    <li>
      {artist.name} (ref: {artist.id})
    </li>
  {/each}
</ul>