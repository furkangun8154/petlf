// Oyun Değişkenleri
let pet = {
    type: 'cat',
    name: 'Minnoş',
    hunger: 50,
    sleep: 70,
    happiness: 60,
    clean: 80,
    health: 85,
    level: 1,
    score: 0,
    age: 0
};

const petNames = {
    cat: ['Minnoş', 'Pisu', 'Pamuk', 'Miyav', 'Cici'],
    dog: ['Köpek', 'Palu', 'Fido', 'Rex', 'Çiko']
};

const petEmojis = {
    cat: '🐱',
    dog: '🐕'
};

let gameActive = false;
let gameInterval = null;

// Oyunu Başlat
function startGame(petType) {
    pet.type = petType;
    const names = petNames[petType];
    pet.name = names[Math.floor(Math.random() * names.length)];
    
    // Ekranları değiştir
    document.getElementById('startScreen').classList.remove('active');
    document.getElementById('gameScreen').classList.add('active');
    
    // UI'ı güncelle
    updateUI();
    
    gameActive = true;
    
    // Her 3 saniyede bir istatistikleri azalt
    gameInterval = setInterval(decreaseStats, 3000);
    
    addEventMessage(`${pet.name} oyuna katılmak için hazır! 🎉`);
}

// Oyun UI'ını Güncelle
function updateUI() {
    document.getElementById('petName').textContent = pet.name;
    document.getElementById('petEmoji').textContent = petEmojis[pet.type];
    document.getElementById('petLevel').textContent = `Seviye: ${pet.level}`;
    document.getElementById('score').textContent = `Puan: ${pet.score}`;
    
    // İstatistikleri güncelle
    updateStats();
    
    // Ruh halini güncelle
    updateMood();
}

// İstatistikler Çubuğunu Güncelle
function updateStats() {
    const stats = [
        { id: 'hunger', value: pet.hunger },
        { id: 'sleep', value: pet.sleep },
        { id: 'happiness', value: pet.happiness },
        { id: 'clean', value: pet.clean },
        { id: 'health', value: pet.health }
    ];
    
    stats.forEach(stat => {
        const clamped = Math.max(0, Math.min(100, stat.value));
        document.getElementById(`${stat.id}Bar`).style.width = clamped + '%';
        document.getElementById(`${stat.id}Value`).textContent = Math.round(clamped);
    });
}

// Ruh Halini Güncelle
function updateMood() {
    let mood = '😊';
    let moodText = 'Mutlu';
    
    // Sağlık çok düşükse
    if (pet.health < 30) {
        mood = '😵';
        moodText = 'Hasta';
    }
    // Mutluluk düşükse
    else if (pet.happiness < 30) {
        mood = '😢';
        moodText = 'Üzgün';
    }
    // Açlık yüksekse
    else if (pet.hunger > 70) {
        mood = '🤤';
        moodText = 'Açlıktan Ölüyor';
    }
    // Uyku yüksekse
    else if (pet.sleep > 70) {
        mood = '😴';
        moodText = 'Uyku Hali';
    }
    // Temizlik düşükse
    else if (pet.clean < 30) {
        mood = '🤢';
        moodText = 'Kirli';
    }
    // Normal mutluluk
    else if (pet.happiness > 70) {
        mood = '😄';
        moodText = 'Çok Mutlu';
    }
    
    document.getElementById('petMood').textContent = `${mood} ${moodText}`;
}

// Besle Aksiyonu
function feedPet() {
    if (!gameActive) return;
    
    if (pet.hunger < 20) {
        addEventMessage('Minnoş zaten tok! 😆');
        return;
    }
    
    pet.hunger = Math.max(0, pet.hunger - 40);
    pet.happiness += 10;
    pet.score += 10;
    
    addEventMessage(`${pet.name} yemeği sevdi! 🍖`);
    updateUI();
    checkGameOver();
}

// Uyut Aksiyonu
function sleepPet() {
    if (!gameActive) return;
    
    if (pet.sleep < 20) {
        addEventMessage('Minnoş istemiyor! 😴');
        return;
    }
    
    pet.sleep = Math.max(0, pet.sleep - 50);
    pet.health += 5;
    pet.hunger += 20;
    pet.score += 5;
    
    addEventMessage(`${pet.name} tatlı uyku çekiyor... 💤`);
    updateUI();
    checkGameOver();
}

// Oyna Aksiyonu
function playPet() {
    if (!gameActive) return;
    
    if (pet.health < 30) {
        addEventMessage('Minnoş çok hasta, oynamaya gücü yetmiyor... 😢');
        return;
    }
    
    if (pet.happiness > 85) {
        addEventMessage('Minnoş yoruldu! Dinlenmesi gerekiyor.');
        return;
    }
    
    pet.happiness += 30;
    pet.hunger += 15;
    pet.sleep += 20;
    pet.clean -= 10;
    pet.health -= 5;
    pet.score += 20;
    
    addEventMessage(`${pet.name} seninle oynamaktan çok eğlendi! 🎾`);
    updateUI();
    checkGameOver();
}

// Yıka Aksiyonu
function washPet() {
    if (!gameActive) return;
    
    if (pet.clean > 80) {
        addEventMessage('Minnoş zaten çok temiz! ✨');
        return;
    }
    
    pet.clean = Math.min(100, pet.clean + 50);
    pet.hunger += 10;
    pet.happiness += 15;
    pet.health += 10;
    pet.score += 15;
    
    addEventMessage(`${pet.name} şimdi çok temiz ve güzel kokullu! 🚿`);
    updateUI();
    checkGameOver();
}

// Tedavi Aksiyonu
function healPet() {
    if (!gameActive) return;
    
    if (pet.health > 80) {
        addEventMessage('Minnoş zaten sağlıklı! ✨');
        return;
    }
    
    pet.health = Math.min(100, pet.health + 40);
    pet.hunger += 5;
    pet.score += 25;
    
    addEventMessage(`${pet.name} tedavi gördü ve daha iyi hissediyor! 💊`);
    updateUI();
    checkGameOver();
}

// İstatistikleri Azalt
function decreaseStats() {
    if (!gameActive) return;
    
    pet.hunger += 5;
    pet.sleep += 3;
    pet.clean -= 2;
    pet.happiness -= 2;
    
    // Açlık seviyesine bağlı sağlık azalması
    if (pet.hunger > 80) {
        pet.health -= 3;
    }
    
    // Temizlik seviyesine bağlı sağlık azalması
    if (pet.clean < 20) {
        pet.health -= 2;
    }
    
    updateUI();
    checkGameOver();
}

// Oyun Bitti Kontrolü
function checkGameOver() {
    // Seviye atlaması
    if (pet.score >= pet.level * 100) {
        pet.level++;
        pet.score = 0;
        addEventMessage(`🎉 Seviye ${pet.level}'e yükseldin!`);
    }
    
    // Oyun Bitti Koşulları
    if (pet.health <= 0) {
        endGame('Hayvanın çok hasta oldu ve tedavi edilemedi... 💔');
    } else if (pet.hunger > 95) {
        endGame('Hayvanın aç aç öldü... 😢');
    } else if (pet.clean < 5) {
        endGame('Hayvanın hastalıktan öldü... 🤢');
    }
}

// Oyunu Sonlandır
function endGame(message) {
    gameActive = false;
    clearInterval(gameInterval);
    
    document.getElementById('gameScreen').classList.remove('active');
    document.getElementById('gameOverScreen').classList.add('active');
    
    document.getElementById('gameOverMessage').textContent = message;
    document.getElementById('finalScore').textContent = `Toplam Puan: ${pet.score}`;
    document.getElementById('finalLevel').textContent = `Ulaştığın Seviye: ${pet.level}`;
}

// Event Mesajı Ekle
function addEventMessage(message) {
    const eventElement = document.getElementById('eventMessage');
    eventElement.textContent = message;
    
    // Mesajı göster sonra fade out yap
    eventElement.style.opacity = '1';
    setTimeout(() => {
        eventElement.style.opacity = '0.5';
    }, 2000);
}

// Oyunu Sıfırla
function resetGame() {
    gameActive = false;
    clearInterval(gameInterval);
    
    // Değişkenleri sıfırla
    pet = {
        type: 'cat',
        name: 'Minnoş',
        hunger: 50,
        sleep: 70,
        happiness: 60,
        clean: 80,
        health: 85,
        level: 1,
        score: 0,
        age: 0
    };
    
    // Ekranları değiştir
    document.getElementById('gameScreen').classList.remove('active');
    document.getElementById('startScreen').classList.add('active');
}