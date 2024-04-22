<script>
  import { navigate } from 'svelte-routing';

  let email = '';
  let password = '';
  let errorMessage = '';
  let loggedIn = false; // Define loggedIn variable here

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/login/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful. Access token:', data.accessToken);
        loggedIn = true; // Update loggedIn status upon successful login
        //navigate('/dashboard');
      } else {
        errorMessage = 'Invalid email or password';
      }
    } catch (error) {
      console.error('Error during login:', error);
      errorMessage = 'Internal server error';
    }
  };

  const handleRegister = () => {
    navigate('/Signup');
  };
</script>

<main>
  <form on:submit|preventDefault={handleSubmit}>
    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} required>

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} required>

    <button type="submit">Login</button>
  </form>

  {#if errorMessage}
    <p class="text-red-500">{errorMessage}</p>
  {/if}

  {#if !loggedIn}
    <p>Not registered yet? <button on:click={handleRegister}>Register here</button>.</p>
  {/if}
</main>

<style>
  main {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 0.5rem;
  }

  input {
    padding: 0.5rem;
    margin-bottom: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>
