<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
  
    // Reactive store for inventory data
    let inventory = writable([]);
  
    // Function to fetch inventory data
    const fetchInventory = async () => {
      try {
        const response = await fetch('/api/dealer/inventory');
        if (response.ok) {
          const data = await response.json();
          inventory.set(data);
        } else {
          throw new Error(`Failed to fetch inventory: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error fetching inventory:', error);
        // Optionally handle error state here
        // For example, you could set an error message in the store
      }
    };
  
    // Call fetchInventory function on component mount
    onMount(fetchInventory);
  </script>
  
  <div class="p-4">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Inventory Overview</h2>
    {#if $inventory.length === 0}
      <p>Loading...</p> <!-- Show loading indicator while fetching data -->
    {:else}
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each $inventory as vehicle}
          <li class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg">
            <img src={vehicle.image} alt={vehicle.make} class="h-48 w-full object-cover">
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">{vehicle.make} {vehicle.model}</h3>
              <p class="text-sm text-gray-600">{vehicle.year} - {vehicle.color}</p>
              <!-- Add more vehicle details as needed -->
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
  
  <style>
    /* Custom CSS styles for the Inventory Overview component */
    .p-4 {
      padding: 1.5rem;
    }
  
    .text-2xl {
      font-size: 1.5rem;
    }
  
    .font-semibold {
      font-weight: 600;
    }
  
    .mb-4 {
      margin-bottom: 1rem;
    }
  
    .bg-white {
      background-color: #ffffff;
    }
  
    .rounded-lg {
      border-radius: 0.5rem;
    }
  
    .shadow-md {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  
    .hover\:shadow-lg:hover {
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    }
  
    .object-cover {
      object-fit: cover;
    }
  
    .text-gray-800 {
      color: #333333;
    }
  
    .text-gray-600 {
      color: #666666;
    }
  </style>
  