<script>
  export let id;
  export let distance;

  let airlines = {
    AAL: "American Airlines",
    DAL: "Delta Air Lines",
    SWA: "Southwest Airlines",
    UAL: "United Airlines",
    JBU: "JetBlue Airways",
  };
</script>

<div class="flex items-center w-full h-12 px-3 border-b">
  <div class="w-36">
    <img src={`/images/airline-logos/${id}.png`} alt={`${airlines[id]}`} class="w-24" />
  </div>
  <div class="ml-4 text-gray-800 w-28">{id}</div>
  <div class="ml-4 text-gray-800">{distance}</div>
</div>
