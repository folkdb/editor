<script>
  import { onMount } from 'svelte';
  
  let artists = [];

  async function getArtists(){
    artists = [];

    const res = await fetch('/.netlify/functions/all-artists');
    
    console.log(res.body);

    const json = await res.json();
    
    json.forEach((item) => {
      const id = item.ref['@ref'].id;
      artists = [...artists, { name : artists.data.name, id: id }];
    });
  }
  
  onMount(async () => getArtists());
  
</script>

<ul>
  {#each artists as artist}
    <li>
      {artist.name} (ref: {artist.id})
    </li>
  {/each}
</ul>