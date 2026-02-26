// ========== متغیرهای سراسری ==========
let currentChipsCurrency = 'AFN';
let chipsExchangeRate = 85;
let chipsChart = null;
let chipsLastResults = null;

// پریست‌های نوع چیپس (چگالی kg/m³)
const chipsPresets = {
    marble: { density: 2700, name: { prs: 'چیپس مرمر', pus: 'د مرمر چپس', eng: 'Marble Chips' } },
    granite: { density: 2750, name: { prs: 'چیپس گرانیت', pus: 'د ګرانایټ چپس', eng: 'Granite Chips' } },
    quartz: { density: 2650, name: { prs: 'چیپس کوارتز', pus: 'د کوارٹز چپس', eng: 'Quartz Chips' } },
    mixed: { density: 2600, name: { prs: 'چیپس مخلوط', pus: 'مخلوط چپس', eng: 'Mixed Chips' } }
};

// نرخ‌های تبدیل حجم
const chipsVolumeConversions = {
    'm3': { factor: 1, name: { prs: 'm³', pus: 'm³', eng: 'm³' } },
    'ft3': { factor: 35.315, name: { prs: 'ft³', pus: 'ft³', eng: 'ft³' } },
    'yd3': { factor: 1.308, name: { prs: 'yd³', pus: 'yd³', eng: 'yd³' } },
    'brass': { factor: 0.1, name: { prs: 'brass', pus: 'brass', eng: 'brass' } }
};

// چگالی مواد (kg/m³)
const chipsDensities = {
    cement: 1440,
    stoneDust: 1600
};

// ========== توابع کمکی ==========

// نمایش زمان فعلی
function updateChipsTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 
        (currentChipsLanguage === 'eng' ? 'PM' : (currentChipsLanguage === 'pus' ? 'غ.م' : 'ب.ظ')) : 
        (currentChipsLanguage === 'eng' ? 'AM' : (currentChipsLanguage === 'pus' ? 'غ.و' : 'ق.ظ'));
    const hour12 = hours % 12 || 12;
    const timeString = `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    const timeElement = document.getElementById('currentTime');
    if (timeElement) timeElement.textContent = timeString;
}

// نمایش هشدار
function showChipsAlert(message, type = 'info', duration = 3000) {
    const oldAlert = document.querySelector('.alert');
    if (oldAlert) oldAlert.remove();
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = 'alert';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        if (alert.parentElement) alert.remove();
    }, duration);
}

// فرمت قیمت
function formatChipsCurrency(amount) {
    if (amount === undefined || amount === null) return '-';
    if (currentChipsCurrency === 'AFN') {
        return amount.toFixed(2) + ' ؋';
    } else {
        return '$' + amount.toFixed(2);
    }
}

// ========== توابع اصلی ==========

// تغییر نوع واحد پول
function changeChipsCurrencyType(type) {
    currentChipsCurrency = type;
    
    // به‌روزرسانی نمادها
    document.querySelectorAll('.currency-symbol, .currency-unit').forEach(el => {
        el.textContent = currentChipsCurrency === 'AFN' ? '؋' : '$';
    });
    
    if (chipsLastResults) {
        calculateChips();
    }
    
    // ذخیره در localStorage
    localStorage.setItem('preferredChipsCurrency', type);
}

// حالت تاریک
function toggleChipsDarkMode() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('#darkModeToggle i');
    if (icon) {
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
    
    // به‌روزرسانی نمودار
    if (chipsChart) {
        const textColor = document.body.classList.contains('dark-mode') ? '#fff' : '#333';
        chipsChart.options.plugins.legend.labels.color = textColor;
        chipsChart.options.plugins.title.color = textColor;
        chipsChart.update();
    }
}

// تغییر نرخ ارز
function updateChipsExchangeRate() {
    const rateInput = document.getElementById('exchangeRate');
    if (rateInput) {
        chipsExchangeRate = parseFloat(rateInput.value) || 85;
        if (chipsLastResults) {
            calculateChips();
        }
    }
}

// تغییر واحد طول
function changeChipsLengthUnit() {
    const unit = document.getElementById('lengthUnit');
    if (!unit) return;
    
    const unitValue = unit.value;
    const unitElements = document.querySelectorAll('.unit-length');
    
    // تغییر متن واحد
    let unitText = 'm';
    if (unitValue === 'cm') unitText = 'cm';
    else if (unitValue === 'ft') unitText = 'ft';
    
    unitElements.forEach(el => el.textContent = unitText);
}

// ========== تابع اصلی محاسبه ==========

function calculateChips() {
    console.log('محاسبه چیپس شروع شد...');
    
    // گرفتن مقادیر
    let wallLength = parseFloat(document.getElementById('wallLength')?.value) || 0;
    let wallWidth = parseFloat(document.getElementById('wallWidth')?.value) || 0;
    let chipsThickness = parseFloat(document.getElementById('chipsThickness')?.value) || 0;
    
    const cementRatio = parseFloat(document.getElementById('cementRatio')?.value) || 0;
    const chipsRatio = parseFloat(document.getElementById('chipsRatio')?.value) || 0;
    const stoneDustPercent = parseFloat(document.getElementById('stoneDustPercent')?.value) || 0;
    const wastePercent = parseFloat(document.getElementById('wastePercent')?.value) || 0;
    const quantity = parseFloat(document.getElementById('quantity')?.value) || 1;
    const dryVolumeFactor = parseFloat(document.getElementById('dryVolume')?.value) || 1.52;
    const cementBagWeight = parseFloat(document.getElementById('cementBagWeight')?.value) || 50;
    
    const cementBagRate = parseFloat(document.getElementById('cementBagRate')?.value) || 0;
    const chipsCuttingRate = parseFloat(document.getElementById('chipsCuttingRate')?.value) || 0;
    const chipsRate = parseFloat(document.getElementById('chipsRate')?.value) || 0;
    
    const chipsType = document.getElementById('chipsType')?.value || 'marble';

    // تبدیل واحد طول به متر
    const unit = document.getElementById('lengthUnit')?.value || 'm';
    
    if (unit === 'cm') {
        wallLength = wallLength / 100;
        wallWidth = wallWidth / 100;
        chipsThickness = chipsThickness / 100;
    } else if (unit === 'ft') {
        wallLength = wallLength / 3.28084;
        wallWidth = wallWidth / 3.28084;
        chipsThickness = chipsThickness / 3.28084;
    }

    // اعتبارسنجی
    if (wallLength <= 0 || wallWidth <= 0 || chipsThickness <= 0) {
        showChipsAlert(chipsLanguages[currentChipsLanguage].error, 'error');
        return;
    }
    
    if (cementRatio <= 0 || chipsRatio <= 0) {
        showChipsAlert(chipsLanguages[currentChipsLanguage].error, 'error');
        return;
    }

    // محاسبه مساحت و حجم
    const wallArea = wallLength * wallWidth;
    const volume = wallArea * chipsThickness * quantity;

    // حجم خشک ملات با در نظر گرفتن ضایعات
    const dryMortarVolume = volume * dryVolumeFactor * (1 + wastePercent / 100);
    
    // مجموع نسبت‌ها (سیمنت + چیپس)
    const totalRatio = cementRatio + chipsRatio;
    
    // حجم سیمنت
    const cementVolume = (cementRatio / totalRatio) * dryMortarVolume;
    
    // حجم چیپس (با احتساب درصد سنگ‌دست)
    const chipsVolume = (chipsRatio / totalRatio) * dryMortarVolume * (1 - stoneDustPercent / 100);
    
    // حجم سنگ‌دست
    const stoneDustVolume = (chipsRatio / totalRatio) * dryMortarVolume * (stoneDustPercent / 100);
    
    // وزن چیپس با توجه به چگالی نوع چیپس
    const chipsDensity = chipsPresets[chipsType].density;
    const chipsWeight = chipsVolume * chipsDensity;
    
    // وزن سیمنت
    const cementWeight = cementVolume * chipsDensities.cement;
    
    // تعداد بوری‌های سیمنت
    const cementBags = cementWeight / cementBagWeight;
    
    // محاسبه قیمت‌ها
    let cementCost, chipsCuttingCost, chipsMaterialCost, totalCost;
    
    if (currentChipsCurrency === 'AFN') {
        cementCost = cementBags * cementBagRate;
        chipsCuttingCost = wallArea * quantity * chipsCuttingRate;
        chipsMaterialCost = chipsWeight * chipsRate;
    } else {
        cementCost = (cementBags * cementBagRate) / chipsExchangeRate;
        chipsCuttingCost = (wallArea * quantity * chipsCuttingRate) / chipsExchangeRate;
        chipsMaterialCost = (chipsWeight * chipsRate) / chipsExchangeRate;
    }
    
    totalCost = cementCost + chipsCuttingCost + chipsMaterialCost;

    // ذخیره نتایج
    chipsLastResults = {
        volume,
        dryMortarVolume,
        cementVolume,
        chipsWeight,
        stoneDustVolume,
        cementBags,
        cementCost,
        chipsCuttingCost,
        chipsMaterialCost,
        totalCost,
        wallArea,
        chipsType
    };

    console.log('نتایج چیپس:', chipsLastResults);

    // به‌روزرسانی جداول
    updateChipsResultsTables(chipsLastResults);
    
    // به‌روزرسانی نمودار
    setTimeout(() => updateChipsChart(cementCost, chipsMaterialCost, 0), 100);
    
    showChipsAlert(chipsLanguages[currentChipsLanguage].success, 'success');
}

// ========== به‌روزرسانی جداول ==========

function updateChipsResultsTables(results) {
    if (!results) return;
    
    // جدول حجم
    document.getElementById('volume').textContent = results.volume.toFixed(3);
    document.getElementById('dryMortar').textContent = results.dryMortarVolume.toFixed(3);
    document.getElementById('cementVolume').textContent = results.cementVolume.toFixed(3);
    document.getElementById('chipsWeight').textContent = results.chipsWeight.toFixed(0);
    document.getElementById('stoneDust').textContent = results.stoneDustVolume.toFixed(3);
    document.getElementById('cementBags').textContent = results.cementBags.toFixed(1);
    
    // جدول قیمت
    document.getElementById('cementCost').textContent = formatChipsCurrency(results.cementCost);
    document.getElementById('chipsCuttingCost').textContent = formatChipsCurrency(results.chipsCuttingCost);
    document.getElementById('chipsCost').textContent = formatChipsCurrency(results.chipsMaterialCost);
    document.getElementById('totalCost').textContent = formatChipsCurrency(results.totalCost);
}

// ========== نمودار ==========

function updateChipsChart(cementCost, chipsCost, dustCost) {
    const canvas = document.getElementById('chipsCostChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (chipsChart) {
        chipsChart.destroy();
    }
    
    // اگر همه صفر باشند
    let cCost = cementCost, chCost = chipsCost, dCost = dustCost;
    if (cementCost === 0 && chipsCost === 0 && dustCost === 0) {
        cCost = 1;
        chCost = 1;
        dCost = 1;
    }
    
    const trans = chipsLanguages[currentChipsLanguage];
    
    chipsChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [trans.cement, trans.chips, trans.stoneDust],
            datasets: [{
                data: [cCost, chCost, dCost],
                backgroundColor: ['#16a085', '#3498db', '#e67e22'],
                hoverBackgroundColor: ['#1abc9c', '#5dade2', '#f39c12']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: document.body.classList.contains('dark-mode') ? '#fff' : '#333',
                        font: {
                            size: 11
                        }
                    }
                },
                title: {
                    display: true,
                    text: trans.chartTitle,
                    color: document.body.classList.contains('dark-mode') ? '#fff' : '#333',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${formatChipsCurrency(value)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// ========== تبدیل واحدها ==========

let currentChipsVolumeUnit = 'm3';

function convertChipsUnits() {
    if (!chipsLastResults) {
        showChipsAlert(chipsLanguages[currentChipsLanguage].warning, 'warning');
        return;
    }
    
    const units = ['m3', 'ft3', 'yd3', 'brass'];
    const nextIndex = (units.indexOf(currentChipsVolumeUnit) + 1) % units.length;
    currentChipsVolumeUnit = units[nextIndex];
    
    const conv = chipsVolumeConversions[currentChipsVolumeUnit];
    const unitName = conv.name[currentChipsLanguage];
    const factor = conv.factor;
    
    const message = `${chipsLanguages[currentChipsLanguage].clickToConvert}:\n\n` +
        `${chipsLanguages[currentChipsLanguage].volume}: ${(chipsLastResults.volume * factor).toFixed(3)} ${unitName}\n` +
        `${chipsLanguages[currentChipsLanguage].dryMortar}: ${(chipsLastResults.dryMortarVolume * factor).toFixed(3)} ${unitName}\n` +
        `${chipsLanguages[currentChipsLanguage].cementVolume}: ${(chipsLastResults.cementVolume * factor).toFixed(3)} ${unitName}\n` +
        `${chipsLanguages[currentChipsLanguage].stoneDust}: ${(chipsLastResults.stoneDustVolume * factor).toFixed(3)} ${unitName}`;
    
    showChipsAlert(message, 'info', 5000);
}

// ========== تاریخچه ==========

function showChipsHistory() {
    const saved = JSON.parse(localStorage.getItem('chipsCalculations') || '[]');
    const modalBody = document.getElementById('chipsHistoryModalBody');
    const modalTitle = document.getElementById('historyModalTitle');
    
    if (!modalBody) return;
    
    if (modalTitle) {
        modalTitle.textContent = chipsLanguages[currentChipsLanguage].history;
    }
    
    if (saved.length === 0) {
        modalBody.innerHTML = `<p class="text-center text-muted my-3">${chipsLanguages[currentChipsLanguage].noHistory}</p>`;
    } else {
        let html = '';
        saved.slice().reverse().forEach((calc, index) => {
            const actualIndex = saved.length - 1 - index;
            const date = calc.date || new Date().toLocaleString();
            html += `
                <div class="history-item" onclick="loadChipsHistoryItem(${actualIndex})">
                    <div>
                        <small class="text-muted">${date}</small>
                        <div><strong>${calc.results?.volume?.toFixed(2) || 0} m³</strong></div>
                        <div><small>${calc.results?.chipsWeight?.toFixed(0) || 0} kg</small></div>
                    </div>
                    <div class="text-left">
                        <span class="badge" style="background-color: #16a085;">${calc.currency || 'AFN'}</span>
                        <div>${formatChipsCurrency(calc.results?.totalCost || 0)}</div>
                    </div>
                </div>
            `;
        });
        modalBody.innerHTML = html;
    }
    
    // نمایش مودال با Bootstrap
    try {
        const modal = new bootstrap.Modal(document.getElementById('chipsHistoryModal'));
        modal.show();
    } catch (e) {
        console.error('خطا در نمایش مودال:', e);
    }
}

function loadChipsHistoryItem(index) {
    const saved = JSON.parse(localStorage.getItem('chipsCalculations') || '[]');
    const calc = saved[index];
    
    if (!calc || !calc.results) return;
    
    // بستن مودال
    try {
        const modal = bootstrap.Modal.getInstance(document.getElementById('chipsHistoryModal'));
        if (modal) modal.hide();
    } catch (e) {
        console.error('خطا در بستن مودال:', e);
    }
    
    // تنظیم واحد پول
    if (calc.currency === 'USD' && currentChipsCurrency === 'AFN') {
        document.getElementById('chipsCurrencySelect').value = 'USD';
        changeChipsCurrencyType('USD');
    } else if (calc.currency === 'AFN' && currentChipsCurrency === 'USD') {
        document.getElementById('chipsCurrencySelect').value = 'AFN';
        changeChipsCurrencyType('AFN');
    }
    
    chipsLastResults = calc.results;
    updateChipsResultsTables(chipsLastResults);
    updateChipsChart(
        chipsLastResults.cementCost, 
        chipsLastResults.chipsMaterialCost, 
        0
    );
    
    showChipsAlert(chipsLanguages[currentChipsLanguage].loaded, 'success');
}

function saveChipsCalculation() {
    if (!chipsLastResults) {
        showChipsAlert(chipsLanguages[currentChipsLanguage].warning, 'warning');
        return;
    }
    
    const saved = JSON.parse(localStorage.getItem('chipsCalculations') || '[]');
    const calculation = {
        date: new Date().toLocaleString(currentChipsLanguage === 'eng' ? 'en-US' : 'fa-IR'),
        results: { ...chipsLastResults },
        currency: currentChipsCurrency
    };
    
    saved.push(calculation);
    
    // محدود کردن به 30 مورد آخر
    if (saved.length > 30) {
        saved.splice(0, saved.length - 30);
    }
    
    localStorage.setItem('chipsCalculations', JSON.stringify(saved));
    showChipsAlert(chipsLanguages[currentChipsLanguage].saved, 'success');
}

// ========== PDF ==========

function generateChipsPDF() {
    if (!chipsLastResults) {
        showChipsAlert(chipsLanguages[currentChipsLanguage].warning, 'warning');
        return;
    }
    
    if (typeof html2pdf === 'undefined') {
        showChipsAlert(chipsLanguages[currentChipsLanguage].pdfError, 'error');
        return;
    }
    
    const element = document.getElementById('calculator-card');
    if (!element) return;
    
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `chips_calculation_${new Date().getTime()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    showChipsAlert(chipsLanguages[currentChipsLanguage].loading, 'info', 2000);
    
    try {
        html2pdf().set(opt).from(element).save();
    } catch (error) {
        console.error('خطا در ساخت PDF:', error);
        showChipsAlert(chipsLanguages[currentChipsLanguage].pdfError, 'error');
    }
}

// ========== اشتراک‌گذاری ==========

function shareChipsResults() {
    if (!chipsLastResults) {
        showChipsAlert(chipsLanguages[currentChipsLanguage].warning, 'warning');
        return;
    }
    
    const trans = chipsLanguages[currentChipsLanguage];
    
    const text = `
🪨 ${trans.appTitle}
📅 ${new Date().toLocaleString()}
==================
📏 ${trans.volume}: ${chipsLastResults.volume.toFixed(3)} m³
🏭 ${trans.cementBags}: ${chipsLastResults.cementBags.toFixed(1)} ${trans.bags}
⚖️ ${trans.chipsWeight}: ${chipsLastResults.chipsWeight.toFixed(0)} kg
🪨 ${trans.stoneDust}: ${chipsLastResults.stoneDustVolume.toFixed(3)} m³
==================
💰 ${trans.cementCost}: ${formatChipsCurrency(chipsLastResults.cementCost)}
💰 ${trans.chipsCuttingCost}: ${formatChipsCurrency(chipsLastResults.chipsCuttingCost)}
💰 ${trans.chipsCost}: ${formatChipsCurrency(chipsLastResults.chipsMaterialCost)}
💵 ${trans.totalCost}: ${formatChipsCurrency(chipsLastResults.totalCost)}
==================
📱 ${trans.appTitle}
    `;
    
    if (navigator.share) {
        navigator.share({
            title: trans.appTitle,
            text: text
        }).catch(() => copyChipsToClipboard(text));
    } else {
        copyChipsToClipboard(text);
    }
}

function copyChipsToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showChipsAlert(chipsLanguages[currentChipsLanguage].copied, 'success');
        }).catch(() => {
            fallbackChipsCopy(text);
        });
    } else {
        fallbackChipsCopy(text);
    }
}

function fallbackChipsCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showChipsAlert(chipsLanguages[currentChipsLanguage].copied, 'success');
    } catch (err) {
        prompt(chipsLanguages[currentChipsLanguage].info, text);
    }
    
    document.body.removeChild(textarea);
}

// ========== مقداردهی اولیه ==========

document.addEventListener('DOMContentLoaded', function() {
    console.log('صفحه چیپس کاملاً بارگذاری شد');
    
    // شروع تایمر
    updateChipsTime();
    setInterval(updateChipsTime, 1000);
    
    // تنظیم رویدادها
    setupChipsEventListeners();
    
    // بارگذاری زبان ذخیره شده
    const savedLang = localStorage.getItem('preferredChipsLanguage');
    if (savedLang && chipsLanguages[savedLang]) {
        document.getElementById('chipsLanguageSelect').value = savedLang;
        changeChipsLanguage(savedLang);
    }
    
    // بارگذاری واحد پول ذخیره شده
    const savedCurrency = localStorage.getItem('preferredChipsCurrency');
    if (savedCurrency) {
        document.getElementById('chipsCurrencySelect').value = savedCurrency;
        changeChipsCurrencyType(savedCurrency);
    }
    
    // محاسبۀ اولیه
    setTimeout(() => {
        calculateChips();
        
        // بارگذاری آخرین محاسبه
        try {
            const saved = JSON.parse(localStorage.getItem('chipsCalculations') || '[]');
            if (saved.length > 0) {
                const last = saved[saved.length - 1];
                if (last && last.currency && last.currency !== currentChipsCurrency) {
                    document.getElementById('chipsCurrencySelect').value = last.currency;
                    changeChipsCurrencyType(last.currency);
                }
            }
        } catch (e) {
            console.error('خطا در بارگذاری تاریخچه:', e);
        }
    }, 200);
});

function setupChipsEventListeners() {
    // اعتبارسنجی ورودی‌ها
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0) this.value = 0;
        });
    });
    
    // محاسبه با دکمه Enter
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateChips();
            }
        });
    });
    
    // ذخیره انتخاب واحد پول
    const currencySelect = document.getElementById('chipsCurrencySelect');
    if (currencySelect) {
        currencySelect.addEventListener('change', function() {
            localStorage.setItem('preferredChipsCurrency', this.value);
        });
    }
}

// ========== توابع سراسری برای فراخوانی از HTML ==========
window.toggleChipsDarkMode = toggleChipsDarkMode;
window.updateChipsExchangeRate = updateChipsExchangeRate;
window.changeChipsCurrencyType = changeChipsCurrencyType;
window.changeChipsLengthUnit = changeChipsLengthUnit;
window.calculateChips = calculateChips;
window.convertChipsUnits = convertChipsUnits;
window.showChipsHistory = showChipsHistory;
window.loadChipsHistoryItem = loadChipsHistoryItem;
window.saveChipsCalculation = saveChipsCalculation;
window.generateChipsPDF = generateChipsPDF;
window.shareChipsResults = shareChipsResults;
window.changeChipsLanguage = changeChipsLanguage;