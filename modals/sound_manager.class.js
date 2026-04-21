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
            jump: this.createAudio('./sounds/character/assets_audio_character_characterJump.wav'),
            stomp: this.createAudio('./sounds/character/stomp.mp3'),
            hit: this.createAudio('./sounds/character/assets_audio_character_characterDamage.mp3'),
            bottle: this.createAudio('./sounds/assets_audio_throwable_bottleBreak.mp3'),
        };

        /** @type {HTMLAudioElement[]} */
        this.walk = new Audio('./sounds/character/assets_audio_character_characterRun.mp3');


         this.allSounds = [this.walk, this.jump, this.stomp, this.hit, this.bottle];
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

    playWalk() {
        this.walk.currentTime = 0;
        this.walk.play().catch(() => {});
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

    stopAll() {
        this.allSounds.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    }
}