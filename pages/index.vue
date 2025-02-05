<script setup>
onMounted(() => {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" })
})
</script>
