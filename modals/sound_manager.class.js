/**
 * Verwaltet alle Soundeffekte des Spiels.
 */
class SoundManager {

    /**
     * @param {string} muteBtnId - ID des Mute-Buttons im DOM
     */
    constructor(muteBtnId = 'muteBtn') {
        /** @type {HTMLElement|null} */
        this.muteBtn = document.getElementById('muteBtn');

        this.muteIcon = document.getElementById('muteIcon');

        /** @type {boolean} */
        this.isMuted = false;

        /** @type {Record<string, HTMLAudioElement>} */
        this.sounds = {
            jump: this.createAudio('./sounds/jump.mp3'),
            stomp: this.createAudio('./sounds/stomp.mp3'),
            hit: this.createAudio('./sounds/splat.mp3'),
        };

        /** @type {HTMLAudioElement[]} */
        this.walkSounds = [
            this.createAudio('./sounds/walking1.mp3'),
        ];
    }

    /**
     * Erstellt ein Audio-Element mit Standard-Settings.
     * @param {string} src
     * @returns {HTMLAudioElement}
     */
    createAudio(src) {
        const audio = new Audio(src);
        audio.preload = 'auto';
        audio.muted = this.isMuted;
        return audio;
    }

    /**
     * Spielt einen bestimmten Sound ab.
     * @param {string} name
     */
    play(name) {
        if (this.isMuted) return;

        const sound = this.sounds[name];
        if (!sound) return;

        sound.currentTime = 0;
        sound.play().catch(() => {}); // verhindert Promise-Fehler im Browser
    }

    /**
     * Spielt zufällig einen Laufsound ab.
     */
    playWalk() {
        if (this.isMuted) return;

        if (this.walkSounds.length === 0) return;

        const index = Math.floor(Math.random() * this.walkSounds.length);
        const sound = this.walkSounds[index];

        sound.currentTime = 0;
        sound.play().catch(() => {});
    }

    /**
     * Setzt den Mute-Zustand für ALLE Sounds korrekt.
     * @param {boolean} muted
     */
    setMuted(muted) {
        this.isMuted = muted;

        // Alle Einzelsounds
        Object.values(this.sounds).forEach(sound => {
            sound.muted = muted;
        });

        // Alle Walk-Sounds
        this.walkSounds.forEach(sound => {
            sound.muted = muted;
        });

        this.updateMuteButton();
    }

    /**
     * Toggle für Mute
     */
    toggleMute() {
        this.setMuted(!this.isMuted);
    }

    /**
     * Aktualisiert die UI des Mute-Buttons
     */
    updateMuteButton() {
        if (!this.muteIcon) return;

        this.muteIcon.src = this.isMuted
            ? './img/mute-icon.png'
            : './img/sound-icon.png';
    }
}