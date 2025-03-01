const prefecturesByRegion = {
    hokkaido: { hokkaido: "Hokkaido" },
    tohoku: {
        aomori: "Aomori", iwate: "Iwate", miyagi: "Miyagi",
        akita: "Akita", yamagata: "Yamagata", fukushima: "Fukushima"
    },
    kanto: {
        ibaraki: "Ibaraki", tochigi: "Tochigi", gunma: "Gunma",
        saitama: "Saitama", chiba: "Chiba", tokyo: "Tokyo", kanagawa: "Kanagawa"
    },
    chubu: {
        niigata: "Niigata", toyama: "Toyama", ishikawa: "Ishikawa", fukui: "Fukui",
        yamanashi: "Yamanashi", nagano: "Nagano", gifu: "Gifu",
        shizuoka: "Shizuoka", aichi: "Aichi"
    },
    kinki: {
        mie: "Mie", shiga: "Shiga", kyoto: "Kyoto", osaka: "Osaka",
        hyogo: "Hyogo", nara: "Nara", wakayama: "Wakayama"
    },
    chugoku: {
        tottori: "Tottori", shimane: "Shimane", okayama: "Okayama",
        hiroshima: "Hiroshima", yamaguchi: "Yamaguchi"
    },
    shikoku: {
        tokushima: "Tokushima", kagawa: "Kagawa", ehime: "Ehime", kochi: "Kochi"
    },
    kyushu: {
        fukuoka: "Fukuoka", saga: "Saga", nagasaki: "Nagasaki",
        kumamoto: "Kumamoto", oita: "Oita", miyazaki: "Miyazaki",
        kagoshima: "Kagoshima", okinawa: "Okinawa"
    }
};

const citiesByPrefecture = {
    hokkaido: ["Sapporo", "Asahikawa", "Hakodate"],
    aomori: ["Aomori", "Hirosaki", "Hachinohe"],
    iwate: ["Morioka", "Ichinoseki"],
    miyagi: ["Sendai", "Ishinomaki"],
    akita: ["Akita", "Yokote"],
    yamagata: ["Yamagata", "Tsuruoka"],
    fukushima: ["Fukushima", "Koriyama"],
    ibaraki: ["Mito", "Tsukuba"],
    tochigi: ["Utsunomiya", "Nikko"],
    gunma: ["Maebashi", "Takasaki"],
    saitama: ["Saitama", "Kawagoe"],
    chiba: ["Chiba", "Narita"],
    tokyo: ["Shinjuku", "Shibuya", "Setagaya", "Tachikawa"],
    kanagawa: ["Yokohama", "Kawasaki", "Sagamihara"],
    niigata: ["Niigata", "Nagaoka"],
    toyama: ["Toyama", "Takaoka"],
    ishikawa: ["Kanazawa", "Komatsu"],
    fukui: ["Fukui", "Tsuruga"],
    yamanashi: ["Kofu", "Fujiyoshida"],
    nagano: ["Nagano", "Matsumoto"],
    gifu: ["Gifu", "Takayama"],
    shizuoka: ["Shizuoka", "Hamamatsu"],
    aichi: ["Nagoya", "Toyota"],
    mie: ["Tsu", "Yokkaichi"],
    shiga: ["Otsu", "Hikone"],
    kyoto: ["Kyoto", "Uji"],
    osaka: ["Osaka", "Sakai"],
    hyogo: ["Kobe", "Himeji"],
    nara: ["Nara", "Kashihara"],
    wakayama: ["Wakayama", "Tanabe"],
    tottori: ["Tottori", "Yonago"],
    shimane: ["Matsue", "Izumo"],
    okayama: ["Okayama", "Kurashiki"],
    hiroshima: ["Hiroshima", "Fukuyama"],
    yamaguchi: ["Yamaguchi", "Shimonoseki"],
    tokushima: ["Tokushima", "Naruto"],
    kagawa: ["Takamatsu", "Marugame"],
    ehime: ["Matsuyama", "Niihama"],
    kochi: ["Kochi", "Nankoku"],
    fukuoka: ["Fukuoka", "Kitakyushu"],
    saga: ["Saga", "Karatsu"],
    nagasaki: ["Nagasaki", "Sasebo"],
    kumamoto: ["Kumamoto", "Yatsushiro"],
    oita: ["Oita", "Beppu"],
    miyazaki: ["Miyazaki", "Nobeoka"],
    kagoshima: ["Kagoshima", "Kirishima"],
    okinawa: ["Naha", "Okinawa City"]
};

function updatePrefectures() {
    const regionSelect = document.getElementById("region");
    const prefectureSelect = document.getElementById("prefecture");
    const citySelect = document.getElementById("city");
    const selectedRegion = regionSelect.value;

    prefectureSelect.innerHTML = '<option value="">Select a prefecture</option>';
    citySelect.innerHTML = '<option value="">Select a prefecture first</option>';
    citySelect.disabled = true;

    if (selectedRegion && prefecturesByRegion[selectedRegion]) {
        Object.keys(prefecturesByRegion[selectedRegion]).forEach(prefCode => {
            let option = document.createElement("option");
            option.value = prefCode;
            option.textContent = prefecturesByRegion[selectedRegion][prefCode];
            prefectureSelect.appendChild(option);
        });
        prefectureSelect.disabled = false;
    } else {
        prefectureSelect.disabled = true;
    }
}

function updateCities() {
    const prefectureSelect = document.getElementById("prefecture");
    const citySelect = document.getElementById("city");
    const selectedPrefecture = prefectureSelect.value;

    citySelect.innerHTML = '<option value="">Select a city</option>';

    if (selectedPrefecture && citiesByPrefecture[selectedPrefecture]) {
        citiesByPrefecture[selectedPrefecture].forEach(city => {
            let option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
        citySelect.disabled = false;
    } else {
        citySelect.disabled = true;
    }
}
function submitSelection(event) {
    event.preventDefault(); // Prevent form from reloading the page
    const region = document.getElementById("region").value;
    const prefecture = document.getElementById("prefecture").value;
    const city = document.getElementById("city").value;

    if (!region || !prefecture || !city) {
        alert("Please select a region, prefecture, and city.");
    } else {
        alert(`Selected: ${region} > ${prefecture} > ${city}`);
    }
}