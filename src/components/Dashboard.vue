<template>
  <div>Dashboard</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Dashboard',
  data: function() {
    return {
      data: [],
    };
  },
  methods: {
    async submitted() {
      console.log({ password: this.password, email: this.email });
      const result = await axios.post(
        'https://2dz7gb09o9.execute-api.us-east-1.amazonaws.com/dev/get',
        {
          password: this.password,
          email: this.email,
        }
      );
      localStorage.setItem('barcodeToken', result.data.token);
    },
  },
};
</script>
