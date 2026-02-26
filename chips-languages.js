// فایل زبان‌های چندگانه برای محاسبۀ چیپس (Chips)
const chipsLanguages = {
    // ========== زبان دری (افغانستان) ==========
    prs: {
        // header
        appTitle: 'محاسبۀ مقدار چیپس',
        appSubtitle: 'محاسبۀ مقدار سیمنت، چیپس، سنگ‌دست و قیمت برای پوشش چیپس',
        
        // units
        meter: 'متر',
        centimeter: 'سانتیمتر',
        foot: 'فوت',
        
        // sections
        wallDimensions: 'ابعاد دیوار',
        mortarMixRatio: 'نسبت مخلوط',
        prices: 'قیمت‌ها (اختیاری)',
        history: 'تاریخچه محاسبات',
        
        // labels
        length: 'درازا',
        width: 'عرض',
        chipsThickness: 'ضخامت چیپس',
        cement: 'سیمنت',
        chips: 'چیپس',
        stoneDust: 'سنگ‌دست',
        wastePercent: 'فیصدی ضایعات',
        quantity: 'تعداد',
        dryVolume: 'حجم خشک',
        cementBagWeight: 'وزن بوری سیمنت',
        cementBagRate: 'قیمت فی بوری',
        chipsCuttingRate: 'قیمت برش چیپس (فی m²)',
        chipsRate: 'قیمت چیپس (فی کیلو)',
        
        // buttons
        print: 'پرینت',
        pdf: 'PDF',
        calculate: 'محاسبه',
        share: 'شریک',
        save: 'ذخیره',
        history: 'تاریخچه',
        
        // results table - volume
        volume: 'حجم',
        dryMortar: 'ملات خشک',
        cementVolume: 'سیمنت',
        chipsWeight: 'وزن چیپس',
        stoneDustVolume: 'سنگ‌دست',
        cementBags: 'بوری‌های سیمنت',
        
        // results table - cost
        cementCost: 'قیمت سیمنت',
        chipsCuttingCost: 'قیمت برش چیپس',
        chipsCost: 'قیمت چیپس',
        totalCost: 'جمله قیمت',
        
        // units text
        bags: 'بوری',
        kg: 'کیلو',
        
        // messages
        success: 'محاسبه با موفقیت انجام شد!',
        error: 'خطا! لطفاً مقادیر را درست وارد کنید.',
        warning: 'اول محاسبه را انجام دهید!',
        info: 'اطلاعات',
        copied: 'نتایج کپی شد!',
        saved: 'محاسبه ذخیره شد!',
        loading: 'در حال تهیه PDF... لطفاً صبر کنید',
        pdfError: 'خطا در ساخت PDF!',
        noHistory: 'هیچ محاسبه‌ای ذخیره نشده است',
        loaded: 'محاسبه بارگذاری شد!',
        
        // footer
        speed: '۱۰۶ KB/s',
        battery: '۱۰۰٪',
        
        // currency
        afghani: 'افغانی',
        dollar: 'دالر',
        
        // chart
        chartTitle: 'تقسیم هزینه‌ها',
        
        // conversion
        clickToConvert: 'کلیک کنید برای تبدیل',
        
        // menu
        quantity: 'مقدار',
        rcc: 'RCC',
        area: 'مساحت',
        volume: 'حجم',
        convert: 'تبدیل',
        
        // chips specific
        chipsType: 'نوع چیپس',
        marbleChips: 'چیپس مرمر',
        graniteChips: 'چیپس گرانیت',
        quartzChips: 'چیپس کوارتز',
        mixedChips: 'چیپس مخلوط'
    },
    
    // ========== زبان پشتو ==========
    pus: {
        // header
        appTitle: 'د چپس مقدار محاسبه',
        appSubtitle: 'د سیمنټ، چپس، ډبرې دوړې او بیې محاسبه د چپس پوښښ لپاره',
        
        // units
        meter: 'متر',
        centimeter: 'سانتي متر',
        foot: 'فوټ',
        
        // sections
        wallDimensions: 'د دیوال اندازه‌ګانې',
        mortarMixRatio: 'د مخلوط نسبت',
        prices: 'بیې (اختیاري)',
        history: 'پخوانۍ محاسبې',
        
        // labels
        length: 'اوږدوالی',
        width: 'پلنوالی',
        chipsThickness: 'د چپس ضخامت',
        cement: 'سیمنټ',
        chips: 'چپس',
        stoneDust: 'ډبرې دوړې',
        wastePercent: 'د ضایعاتو فیصدي',
        quantity: 'تعداد',
        dryVolume: 'خشک حجم',
        cementBagWeight: 'د سیمنټ د بوجۍ وزن',
        cementBagRate: 'د فی بوجۍ بیه',
        chipsCuttingRate: 'د چپس پرې کولو بیه (فی m²)',
        chipsRate: 'د چپس بیه (فی کیلو)',
        
        // buttons
        print: 'چاپ',
        pdf: 'PDF',
        calculate: 'محاسبه',
        share: 'شریکول',
        save: 'ذخیره',
        history: 'تاریخچه',
        
        // results table - volume
        volume: 'حجم',
        dryMortar: 'خشک ملات',
        cementVolume: 'سیمنټ',
        chipsWeight: 'د چپس وزن',
        stoneDustVolume: 'ډبرې دوړې',
        cementBags: 'د سیمنټ بوجۍ',
        
        // results table - cost
        cementCost: 'د سیمنټ بیه',
        chipsCuttingCost: 'د چپس پرې کولو بیه',
        chipsCost: 'د چپس بیه',
        totalCost: 'ټوله بیه',
        
        // units text
        bags: 'بوجۍ',
        kg: 'کیلو',
        
        // messages
        success: 'محاسبه په بریالیتوب سره ترسره شوه!',
        error: 'تېروتنه! لطفاً ارزښتونه سم داخل کړئ.',
        warning: 'لومړی محاسبه ترسره کړئ!',
        info: 'معلومات',
        copied: 'پایلې کاپي شوې!',
        saved: 'محاسبه ذخیره شوه!',
        loading: 'PDF چمتو کیږي... لطفاً انتظار وکړئ',
        pdfError: 'د PDF په جوړولو کې تېروتنه!',
        noHistory: 'هیڅ محاسبه نه ده ذخیره شوې',
        loaded: 'محاسبه بار شوه!',
        
        // footer
        speed: '۱۰۶ KB/s',
        battery: '۱۰۰٪',
        
        // currency
        afghani: 'افغانۍ',
        dollar: 'ډالر',
        
        // chart
        chartTitle: 'د لګښتونو وېش',
        
        // conversion
        clickToConvert: 'د بدلولو لپاره کلیک وکړئ',
        
        // menu
        quantity: 'مقدار',
        rcc: 'RCC',
        area: 'ساحه',
        volume: 'حجم',
        convert: 'بدلول',
        
        // chips specific
        chipsType: 'د چپس ډول',
        marbleChips: 'د مرمر چپس',
        graniteChips: 'د ګرانایټ چپس',
        quartzChips: 'د کوارټز چپس',
        mixedChips: 'مخلوط چپس'
    },
    
    // ========== زبان انگلیسی ==========
    eng: {
        // header
        appTitle: 'Chips Quantity Calculator',
        appSubtitle: 'Calculate cement, chips, stone dust quantity and cost for chips covering',
        
        // units
        meter: 'm',
        centimeter: 'cm',
        foot: 'ft',
        
        // sections
        wallDimensions: 'Wall Dimensions',
        mortarMixRatio: 'Mix Ratio',
        prices: 'Prices (Optional)',
        history: 'Calculation History',
        
        // labels
        length: 'Length',
        width: 'Width',
        chipsThickness: 'Chips Thickness',
        cement: 'Cement',
        chips: 'Chips',
        stoneDust: 'Stone Dust',
        wastePercent: 'Waste Percentage',
        quantity: 'Quantity',
        dryVolume: 'Dry Volume',
        cementBagWeight: 'Cement Bag Weight',
        cementBagRate: 'Price per Bag',
        chipsCuttingRate: 'Chips Cutting Rate (per m²)',
        chipsRate: 'Chips Rate (per kg)',
        
        // buttons
        print: 'Print',
        pdf: 'PDF',
        calculate: 'Calculate',
        share: 'Share',
        save: 'Save',
        history: 'History',
        
        // results table - volume
        volume: 'Volume',
        dryMortar: 'Dry Mortar',
        cementVolume: 'Cement',
        chipsWeight: 'Chips Weight',
        stoneDustVolume: 'Stone Dust',
        cementBags: 'Cement Bags',
        
        // results table - cost
        cementCost: 'Cement Cost',
        chipsCuttingCost: 'Chips Cutting Cost',
        chipsCost: 'Chips Cost',
        totalCost: 'Total Cost',
        
        // units text
        bags: 'bags',
        kg: 'kg',
        
        // messages
        success: 'Calculation successful!',
        error: 'Error! Please enter valid values.',
        warning: 'Please calculate first!',
        info: 'Information',
        copied: 'Results copied to clipboard!',
        saved: 'Calculation saved!',
        loading: 'Generating PDF... Please wait',
        pdfError: 'Error generating PDF!',
        noHistory: 'No saved calculations',
        loaded: 'Calculation loaded!',
        
        // footer
        speed: '106 KB/s',
        battery: '100%',
        
        // currency
        afghani: 'AFN',
        dollar: 'USD',
        
        // chart
        chartTitle: 'Cost Distribution',
        
        // conversion
        clickToConvert: 'Click to convert',
        
        // menu
        quantity: 'Quantity',
        rcc: 'RCC',
        area: 'Area',
        volume: 'Volume',
        convert: 'Convert',
        
        // chips specific
        chipsType: 'Chips Type',
        marbleChips: 'Marble Chips',
        graniteChips: 'Granite Chips',
        quartzChips: 'Quartz Chips',
        mixedChips: 'Mixed Chips'
    }
};

// زبان پیش‌فرض
let currentChipsLanguage = 'prs'; // prs, pus, eng

// تابع تغییر زبان
function changeChipsLanguage(lang) {
    if (!chipsLanguages[lang]) {
        console.error('Language not supported:', lang);
        return;
    }
    
    currentChipsLanguage = lang;
    const trans = chipsLanguages[lang];
    
    // به‌روزرسانی تمام متن‌های صفحه
    updateChipsTextContent(trans);
    
    // ذخیره در localStorage
    localStorage.setItem('preferredChipsLanguage', lang);
    
    // نمایش پیام
    showChipsAlert(trans.success, 'success');
}

// تابع به‌روزرسانی متن‌ها
function updateChipsTextContent(trans) {
    // header
    setChipsText('appTitle', trans.appTitle);
    setChipsText('appSubtitle', trans.appSubtitle);
    
    // menu
    setChipsText('menuQuantity', trans.quantity);
    setChipsText('menuRcc', trans.rcc);
    setChipsText('menuArea', trans.area);
    setChipsText('menuVolume', trans.volume);
    setChipsText('menuConvert', trans.convert);
    
    // sections
    setChipsText('wallDimensionsTitle', trans.wallDimensions);
    setChipsText('mortarMixTitle', trans.mortarMixRatio);
    setChipsText('pricesTitle', trans.prices);
    
    // labels
    setChipsText('lengthLabel', trans.length);
    setChipsText('widthLabel', trans.width);
    setChipsText('thicknessLabel', trans.chipsThickness);
    setChipsText('cementLabel', trans.cement);
    setChipsText('chipsLabel', trans.chips);
    setChipsText('stoneDustLabel', trans.stoneDust);
    setChipsText('wasteLabel', trans.wastePercent);
    setChipsText('quantityLabel', trans.quantity);
    setChipsText('dryVolumeLabel', trans.dryVolume);
    setChipsText('cementBagWeightLabel', trans.cementBagWeight);
    setChipsText('cementBagRateLabel', trans.cementBagRate);
    setChipsText('chipsCuttingRateLabel', trans.chipsCuttingRate);
    setChipsText('chipsRateLabel', trans.chipsRate);
    setChipsText('lengthUnitLabel', trans.lengthUnit || trans.meter);
    setChipsText('chipsTypeLabel', trans.chipsType);
    
    // buttons
    setChipsText('printBtn', trans.print);
    setChipsText('pdfBtn', trans.pdf);
    setChipsText('calculateBtn', trans.calculate);
    setChipsText('shareBtn', trans.share);
    setChipsText('saveBtn', trans.save);
    setChipsText('historyBtn', trans.history);
    
    // results tables headers
    setChipsText('materialTh', trans.material || 'Material');
    setChipsText('quantityTh', trans.quantity);
    setChipsText('unitTh', trans.unit || 'Unit');
    setChipsText('costTh', trans.cost || 'Cost');
    
    // volume table
    setChipsText('volumeText', trans.volume);
    setChipsText('dryMortarText', trans.dryMortar);
    setChipsText('cementVolumeText', trans.cementVolume);
    setChipsText('chipsWeightText', trans.chipsWeight);
    setChipsText('stoneDustText', trans.stoneDustVolume);
    setChipsText('cementBagsText', trans.cementBags);
    
    // cost table
    setChipsText('cementCostText', trans.cementCost);
    setChipsText('chipsCuttingCostText', trans.chipsCuttingCost);
    setChipsText('chipsCostText', trans.chipsCost);
    setChipsText('totalCostText', trans.totalCost);
    
    // footer
    setChipsText('speedText', trans.speed);
    setChipsText('batteryText', trans.battery);
    
    // conversion
    setChipsText('clickToConvert', trans.clickToConvert);
    
    // chips type options
    const chipsTypeSelect = document.getElementById('chipsType');
    if (chipsTypeSelect) {
        const options = chipsTypeSelect.options;
        if (options.length >= 4) {
            options[0].text = trans.marbleChips;
            options[1].text = trans.graniteChips;
            options[2].text = trans.quartzChips;
            options[3].text = trans.mixedChips;
        }
    }
    
    // chart
    if (window.chipsChart) {
        chipsChart.options.plugins.title.text = trans.chartTitle;
        chipsChart.data.labels = [trans.cement, trans.chips, trans.stoneDust];
        chipsChart.update();
    }
}

// تابع کمکی برای تنظیم متن
function setChipsText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
        if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
            if (element.tagName === 'BUTTON') {
                const span = element.querySelector('span');
                if (span) {
                    span.textContent = text;
                } else {
                    element.innerHTML = `<i class="${element.querySelector('i')?.className}"></i> ${text}`;
                }
            } else {
                element.value = text;
            }
        } else {
            element.textContent = text;
        }
    }
}

// بارگذاری زبان ذخیره شده
function loadChipsSavedLanguage() {
    const savedLang = localStorage.getItem('preferredChipsLanguage');
    if (savedLang && chipsLanguages[savedLang]) {
        changeChipsLanguage(savedLang);
        
        // تنظیم select
        const langSelect = document.getElementById('chipsLanguageSelect');
        if (langSelect) {
            langSelect.value = savedLang;
        }
    }
}

// اجرا بعد از بارگذاری صفحه
document.addEventListener('DOMContentLoaded', function() {
    loadChipsSavedLanguage();
});