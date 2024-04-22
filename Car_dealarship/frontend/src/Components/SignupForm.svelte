<!-- SignupForm.svelte -->

<script>
  import { navigate } from 'svelte-routing';

  let email = '';
  let password = '';
  let name = '';
  let age = '';
  let phone = '';
  let role = '';
  let location = '';
  let errorMessage = '';

  const initializeForm = () => {
    role = 'user'; // Default role
  };

  initializeForm();

  const handleSubmit = async () => {
    try {
      const userData = {
        email,
        password,
        user_info: {
          name,
          age,
          phone,
          role,
          location
        }
      };

      const response = await fetch('http://localhost:3000/auth/register/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        
        // Redirect based on role
        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else if (role === 'dealer') {
          navigate('/dealer/dashboard');
        } else {
          navigate('/Components/user/Dashboard');
        }
      } else {
        const errorData = await response.json();
        errorMessage = errorData.error;
      }
    } catch (error) {
      console.error('Error during registration:', error);
      errorMessage = 'Internal server error';
    }
  };
</script>
<style>
  /* Custom CSS styles */

  /* Form container */
  .form-container {
    max-width: 30rem;
    margin: 0 auto;
    padding: 1.5rem;
    background-color: #f0f4f8;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    transition: transform 0.3s ease-in-out;
  }

  /* Form labels */
  label {
    display: block;
    font-size: 0.875rem;
    color: #4a5568;
    margin-bottom: 0.5rem;
  }

  /* Form inputs */
  input[type="email"],
  input[type="password"],
  input[type="text"],
  input[type="number"],
  select {
    width: 100%;
    margin-top: 0.25rem;
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #cbd5e0;
    border-radius: 0.375rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  /* Form inputs on focus */
  input[type="email"]:focus,
  input[type="password"]:focus,
  input[type="text"]:focus,
  input[type="number"]:focus,
  select:focus {
    border-color: #667eea;
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.5);
  }

  /* Form button */
  button[type="submit"] {
    display: block;
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    background-color: #667eea;
    border: none;
    border-radius: 0.375rem;
    transition: background-color 0.15s ease-in-out, transform 0.15s ease-in-out;
    cursor: pointer;
  }

  /* Form button on hover */
  button[type="submit"]:hover {
    background-color: #5a67d8;
    transform: translateY(-2px);
  }
</style>

<h2 class="text-3xl font-bold mb-6 text-center">User Registration</h2>

{#if errorMessage}
  <p style="color: red;">{errorMessage}</p>
{/if}

<div class="form-container">
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={email} required />
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={password} required />
    </div>
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" bind:value={name} required />
    </div>
    <div>
      <label for="age">Age:</label>
      <input type="number" id="age" bind:value={age} required />
    </div>
    <div>
      <label for="phone">Phone:</label>
      <input type="text" id="phone" bind:value={phone} required />
    </div>
    <div>
      <label for="role">Role:</label>
      <select id="role" bind:value={role} required>
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="dealer">
            <a href="/dealer/SoldVehicleList">Dealer</a>
        </option>
        <option value="user">
            <a href="/user/Dashboard">User</a>
        </option>
    </select>
    </div>
    <div>
      <label for="location">Location:</label>
      <input type="text" id="location" bind:value={location} required />
    </div>
    <button type="submit">Register</button>
  </form>
</div>
