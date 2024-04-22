<script>
    import { navigate } from 'svelte-routing';
  
    const handleRoleSelect = (role) => {
        if (role === 'dealer') {
            navigate('/dealer/signup');
        } else if (role === 'admin') {
            navigate('/admin/signup');
        } else {
            navigate('/signup');
        }
    };
</script>

<style>
    .flex {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .button-container button {
        padding: 10px 20px;
        margin-right: 10px;
        font-size: 14px;
        font-weight: bold;
        color: #ffffff;
        background-color: #667eea;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .button-container button:last-child {
        margin-right: 0;
    }

    .button-container button:hover {
        background-color: #5a67d8;
    }
</style>

<div class="flex">
    <div class="button-container">
        <button on:click={() => handleRoleSelect('client')}>
            Sign up as Client
        </button>
        <button on:click={() => handleRoleSelect('dealer')}>
            Sign up as Dealer
        </button>
        <button on:click={() => handleRoleSelect('admin')}>
            Sign up as Admin
        </button>
    </div>
</div>
