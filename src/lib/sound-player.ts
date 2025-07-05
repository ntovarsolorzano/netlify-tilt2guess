export function playClickSound() {
    try {
        const settingsString = localStorage.getItem('tilt-n-guess-settings');
        if (settingsString) {
            const settings = JSON.parse(settingsString);
            if (settings.isMuted) {
                return; // Don't play sound if muted
            }
        }
    } catch (error) {
        console.error("Could not read settings for sound player.", error);
    }
    
    const audio = new Audio('/api/sounds/click');
    audio.play().catch(e => console.error("Click sound failed to play.", e));
}
