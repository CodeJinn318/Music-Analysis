const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add slight delay between each principle
            const delay = Array.from(entry.target.parentElement.children)
                              .indexOf(entry.target) * 200;
            entry.target.style.transitionDelay = `${delay}ms`;
        }
    });
}, observerOptions);

// Observe all principles
document.querySelectorAll('.principle').forEach(principle => {
    observer.observe(principle);
});

// Add welcoming message based on time of day
function displayWelcomeMessage() {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : 
                    hour < 17 ? 'Good afternoon' : 
                    'Good evening';
    
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'welcome-message';
    welcomeDiv.textContent = `${greeting}, welcome to the world of Indian Classical Music`;
    
    document.querySelector('.hero-content').prepend(welcomeDiv);
}

// Initialize welcome message
document.addEventListener('DOMContentLoaded', displayWelcomeMessage);

// Add audio preview on raga card hover
document.querySelectorAll('.raga-card').forEach(card => {
    const audio = card.querySelector('audio');
    
    card.addEventListener('mouseenter', () => {
        if (audio) {
            audio.volume = 0.2;
            audio.play();
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
});

// Audio Analysis Functions
class AudioAnalyzer {
  constructor() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.analyzer = this.audioContext.createAnalyser();
    this.setupRecording();
  }

  setupRecording() {
    const startButton = document.getElementById('startRecording');
    const stopButton = document.getElementById('stopRecording');
    
    startButton.addEventListener('click', () => this.startRecording());
    stopButton.addEventListener('click', () => this.stopRecording());
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.chunks = [];
      
      this.mediaRecorder.ondataavailable = (e) => this.chunks.push(e.data);
      this.mediaRecorder.start();
      
      document.getElementById('startRecording').disabled = true;
      document.getElementById('stopRecording').disabled = false;
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  }

  stopRecording() {
    this.mediaRecorder.stop();
    document.getElementById('startRecording').disabled = false;
    document.getElementById('stopRecording').disabled = true;
    
    this.mediaRecorder.onstop = () => {
      const audioBlob = new Blob(this.chunks, { type: 'audio/wav' });
      this.analyzeAudio(audioBlob);
    };
  }

  async analyzeAudio(audioData) {
    const arrayBuffer = await audioData.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    
    // Analyze rhythm
    this.analyzeRhythm(audioBuffer);
    // Analyze raga patterns
    this.analyzeRagaPatterns(audioBuffer);
  }

  analyzeRhythm(audioBuffer) {
    // Implement rhythm analysis visualization
    const rhythmViz = document.querySelector('#rhythmPattern .visualization');
    // Add visualization logic here
  }

  analyzeRagaPatterns(audioBuffer) {
    // Implement raga pattern analysis visualization
    const ragaViz = document.querySelector('#ragaPattern .visualization');
    // Add visualization logic here
  }
}

// Initialize audio analyzer
document.addEventListener('DOMContentLoaded', () => {
  const analyzer = new AudioAnalyzer();
  
  // Handle file upload
  document.getElementById('audioFileInput').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
      await analyzer.analyzeAudio(file);
    }
  });
});
  
// Manage background audio
const backgroundAudio = document.getElementById('bg-audio');
const ragaAudioElements = document.querySelectorAll('.raga-audio');

// Toggle background audio based on raga playback
function toggleBackgroundAudio() {
    const isAnyRagaAudioPlaying = [...ragaAudioElements].some(audio => !audio.paused);
    if (isAnyRagaAudioPlaying) {
        backgroundAudio.pause();
    } else {
        backgroundAudio.play();
    }
}

// Add event listeners to raga audios
ragaAudioElements.forEach(audio => {
    audio.addEventListener('play', toggleBackgroundAudio);
    audio.addEventListener('pause', toggleBackgroundAudio);
});

// Play background audio on load
window.addEventListener('load', () => {
    backgroundAudio.play();
});
