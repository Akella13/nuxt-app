<template>
  <header>
    <ul>
      <li>
        <NuxtLink to="/">
          Home
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/dnd">
          Dnd
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about">
          About
        </NuxtLink>
      </li>
    </ul>
    <slot />
  </header>
</template>
