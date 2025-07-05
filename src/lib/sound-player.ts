export function playClickSound() {
    const audio = new Audio('/api/sounds/click');
    audio.play().catch(e => console.error("Click sound failed to play.", e));
}
