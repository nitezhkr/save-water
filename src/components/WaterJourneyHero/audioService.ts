// Procedural Ambient Water Soundscape using Web Audio API
// Self-contained, lightweight, zero external file dependencies

class WaterAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private rainNode: AudioNode | null = null;
  private masterGain: GainNode | null = null;


  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Generate pink/water noise for ambient rain & river flow
  private createNoiseNode(): AudioNode {
    if (!this.ctx) throw new Error('AudioContext not ready');
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      data[i] *= 0.11;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;
    whiteNoise.loop = true;
    whiteNoise.start(0);
    return whiteNoise;
  }

  public toggleAudio(): boolean {
    this.initContext();
    if (!this.ctx || !this.masterGain) return false;

    if (this.isMuted) {
      this.isMuted = false;
      this.startAmbience();
      this.masterGain.gain.setTargetAtTime(0.2, this.ctx.currentTime, 0.5);
      return true;
    } else {
      this.isMuted = true;
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3);
      return false;
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private startAmbience() {
    if (!this.ctx || !this.masterGain || this.rainNode) return;

    try {
      // Gentle stream / atmospheric rain filter
      const noise = this.createNoiseNode();
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.Q.setValueAtTime(2, this.ctx.currentTime);

      const ambienceGain = this.ctx.createGain();
      ambienceGain.gain.setValueAtTime(0.4, this.ctx.currentTime);

      noise.connect(filter);
      filter.connect(ambienceGain);
      ambienceGain.connect(this.masterGain);

      this.rainNode = ambienceGain;
    } catch {
      // Audio context might have been restricted
    }
  }

  // Play a natural crystal water droplet sound with harmonic chime
  public playWaterDrop(pitch: number = 600) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const dropGain = this.ctx.createGain();

    osc.type = 'sine';
    const startTime = this.ctx.currentTime;
    
    // Frequency sweeps quickly upward like a true water droplet ping
    osc.frequency.setValueAtTime(pitch, startTime);
    osc.frequency.exponentialRampToValueAtTime(pitch * 2.2, startTime + 0.08);

    dropGain.gain.setValueAtTime(0.35, startTime);
    dropGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

    osc.connect(dropGain);
    dropGain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + 0.26);
  }
}

export const waterAudio = new WaterAudioEngine();
