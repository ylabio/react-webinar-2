export default function generateIDs() {
    return String(Date.now().toString(36) + Math.random().toString(36)).slice(0, 12);
}


