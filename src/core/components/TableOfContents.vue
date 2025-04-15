<script lang="ts" setup>
import { defineProps, defineOptions } from "vue";

defineOptions({
    name: "TableOfContents",
});

interface SidebarItem {
    text: string;
    link?: string;
    items?: SidebarItem[];
    collapsed?: boolean;
}

const props = defineProps<{
    items: SidebarItem[];
}>();
</script>

<template>
    <ul>
        <li v-for="item of items">
            <a v-if="item.link" :href="item.link">{{ item.text }}</a>
            <span v-else>{{ item.text }}</span>
            <TableOfContents v-if="item.items" :items="item.items" />
        </li>
    </ul>
</template>
