<!-- SoldVehicleList.svelte -->
<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
  
    // Define a writable store to hold the fetched sold vehicles
    let soldVehicles = writable([]);
  
    // Fetch sold vehicles from the backend endpoint
    async function fetchSoldVehicles() {
      try {
        const response = await fetch('http://localhost:3000/dealerships/sold-vehicles');
        if (response.ok) {
          const data = await response.json();
          soldVehicles.set(data);
        } else {
          console.error('Failed to fetch sold vehicles:', response.status);
        }
      } catch (error) {
        console.error('Error fetching sold vehicles:', error);
      }
    }
  
    // Fetch sold vehicles when the component is mounted
    onMount(fetchSoldVehicles);
  </script>
  
  <style>
    /* CSS styles for the table */
    .sold-vehicles-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
  
    .sold-vehicles-table th, .sold-vehicles-table td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
  
    .sold-vehicles-table th {
      background-color: #f2f2f2;
    }
  </style>
  
  <h1>Sold Vehicle List</h1>
  
  <table class="sold-vehicles-table">
    <thead>
      <tr>
        <th>Vehicle ID</th>
        <th>Car ID</th>
        <th>User ID</th>
        <th>User Email</th>
        <th>User Location</th>
      </tr>
    </thead>
    <tbody>
      {#each $soldVehicles as vehicle}
        <tr>
          <td>{vehicle.vehicle_id}</td>
          <td>{vehicle.car_id}</td>
          <td>{vehicle.owner_info.user_id}</td>
          <td>{vehicle.owner_info.user_email}</td>
          <td>{vehicle.owner_info.user_location}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  