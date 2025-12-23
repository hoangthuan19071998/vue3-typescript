import { ref, watch } from "vue";
export function useLocalStorage(key: string, defaultValue: string) {

    const storedValue = localStorage.getItem(key);
    const data = ref(storedValue || defaultValue);
    watch(data, (newVal) => {
        if (newVal) {
            localStorage.setItem(key, newVal)
        } else {
            localStorage.removeItem(key)
        }
    })

    return data
}