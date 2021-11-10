const fs = require('fs');
const pdf = require('pdf-parse');
const pdfjsLib = require("pdfjs-dist/es5/build/pdf.js");
const PDFParser = require("pdf2json");
const {isDate} = require('date-fns');

let pdfParser = new PDFParser();

const pdfParserHook = (req, res, next) => {
  const spaceRegex = /%20/g
  const commaRegex = /%2C/g
  const backSlashRegex = /%2F/g
  const numberOnlyRegex = /^[0-9]+$/
  // const stripeRegex = /-/
  const stripeRegex = /-/g
  const currencyRegex = /,00/g

  // -------------------------------------------------------- pdf.js Test --------------------------------------------------------
  // nomor bupot && npwp: kendala di gambar image | length 15 dan number only
  // nama npwp ?
  // masa pajak: length 6 7, stripe regex count 1, isDate
  // kode objek pajak: length < 12, stripe regex count 2, is not Date, listed in our code
  // penghasilan bruto, income tax: contain ,00
  // tarif: dari kode pajak
  // extra tarif: using calculation

  var loadingTask = pdfjsLib.getDocument('./doc/Screen Shot 2021-03-29 at 3.24.28 PM.pdf');
  // var loadingTask = pdfjsLib.getDocument('./doc/tax.pdf');
  // var loadingTask = pdfjsLib.getDocument('./doc/Birotika 3300000190.pdf');
  // var loadingTask = pdfjsLib.getDocument('./doc/document.pdf');
  // var loadingTask = pdfjsLib.getDocument('./doc/document(1).pdf');
  // var loadingTask = pdfjsLib.getDocument('./doc/document(2).pdf');
  // var loadingTask = pdfjsLib.getDocument('./doc/document(3).pdf');
  // var loadingTask = pdfjsLib.getDocument('./doc/eBukpot1.pdf');
  // var loadingTask = pdfjsLib.getDocument('./doc/Contoh Elektronik Bukti Potong.pdf');
  loadingTask.promise
  .then(function(pdf) {
    // you can now use *pdf* here
    pdf.getPage(1)
    .then(function(page) {
      // you can now use *page* here
      // console.log('>>:', page)
      page.getTextContent()
      .then(texts => {
        console.log('check:', texts.items)
        // texts.items.map((text, index) => console.log(`check:${index}`, text.str))
        // const slice = texts.items.slice(texts.items.length-10, texts.items.length)
        // console.log('check: test', slice.length)
        // slice.map((text, index) => console.log(`check:${index}`, text.str))
        // var count = (test.match(/-/g) || []).length;
        // const filter = texts.items.filter(text => text.str.length >= 6 && text.str.length <= 7 && text.str.match(stripeRegex) ? text.str.match(stripeRegex).length == 1 : false)
        // const filter = texts.items.filter(text => currencyRegex.test(text.str))
        // console.log('check: filter', filter.length)
        // console.log('check: filter', filter)
        // console.log('check: no:', texts.items[127].str, texts.items[127].str.length, texts.items[127].str.match(stripeRegex).length)
        // console.log('check: no:', texts.items[135].str, texts.items[135].str.length, numberOnlyRegex.test(texts.items[135].str))
        return texts
      })
      .catch(err => console.log('ERROR: get text', err))

      return page
    })
    .catch(err => console.log('ERROR: get page', err))

    return pdf
  })
  .catch(err => console.log('ERROR: get document', err))

  // -------------------------------------------------------- pdf2JSON Test --------------------------------------------------------
  // // let dataBuffer = fs.readFileSync('./doc/tax.pdf');
  // // let dataBuffer = fs.readFileSync('./doc/Birotika 3300000190.pdf');
  // let dataBuffer = fs.readFileSync('./doc/document.pdf');

  // pdfParser.parseBuffer(dataBuffer)

  // pdfParser.on("pdfParser_dataReady", pdfData => {
  //   // for (let i = 0; i <= 300; i++) {
  //   //   if (pdfData.formImage.Pages[0].Texts[i]) {
  //   //     console.log(`test:${i}`, pdfData.formImage.Pages[0].Texts[i].R[0].T)
  //   //   } else {
  //   //     console.log(`err:${i}`, pdfData.formImage.Pages[0].Texts[i])
  //   //   }
  //   // }

  //   // 4 jenis pph x 16 17 y 3 4
  //   // 117 nomor bupot x 14 15 y 4 5
  //   // 118 nomor npwp x 8 9 y 7 8 w 75 85
  //   // 119 nama npwp x 8 9 y 9 10 w 95 105 > 16
  //   // 126 masa pajak x 3 4 y 17 20 w 24 31 > 16 ??? got 2 on biro
  //   // 127 kode objek pajak x 8 9 y 17 20 w 36 45 
  //   // 128 penghasilan bruto
  //   // 129 tarif 100%
  //   // 130 tarif
  //   // 131 incom tax
  //   // 132 - 134 detail dokumen refrensi

  //   const spaceRegex = /%20/g
  //   const replaceSpace = (text) => text.replace(spaceRegex, ' ') 
  //   const commaRegex = /%2C/g
  //   const replaceComma = (text) => text.replace(commaRegex, ',') 
  //   const backSlashRegex = /%2F/g
  //   const replaceBackSlash = (text) => text.replace(backSlashRegex, '/') 

  //   const targetPage = 0
  //   const convertedPage = pdfData.formImage.Pages[targetPage]

  //   let filter = convertedPage.Texts.filter(text => text.R[0].T.length == 10)
  //   // let filter = convertedPage.Texts.filter(text => Math.floor(text.x) >= 16 && Math.floor(text.x) <= 17 && Math.floor(text.y) >= 3 && Math.floor(text.y) <= 4)
  //   // let filter = convertedPage.Texts.filter(text => Math.floor(text.x) >= 8 && Math.floor(text.x) <= 9 && Math.floor(text.y) >= 17 && Math.floor(text.y) <= 20 && Math.floor(text.w) >= 16)
  //   console.log(`test:`, filter.length)
  //   console.log(`test:`, filter[0])
  //   console.log(`test:`, filter[1])
  //   console.log(`test:`, filter[2])
  //   console.log(`test:`, filter[3])

  //   // console.log(`test:`, convertedPage.Texts[4])

  //   // const incomeTaxArticleNo = replaceSpace(convertedPage.Texts[4].R[0].T)
  //   // const incomeTaxCertificateNo = convertedPage.Texts[117].R[0].T
  //   // const taxPayerNPWPNo = convertedPage.Texts[118].R[0].T
  //   // const taxPayer = replaceSpace(convertedPage.Texts[119].R[0].T)
  //   // const taxPeriod = convertedPage.Texts[126].R[0].T
  //   // const taxObjectCode = convertedPage.Texts[127].R[0].T
  //   // const grossIncome = replaceComma(convertedPage.Texts[128].R[0].T)
  //   // const extraTariff = convertedPage.Texts[129].R[0].T
  //   // const tariff = convertedPage.Texts[130].R[0].T
  //   // const incomeTax = replaceComma(convertedPage.Texts[131].R[0].T)
  //   // const refDocName = convertedPage.Texts[132].R[0].T
  //   // const refDocNo = replaceSpace(replaceBackSlash(convertedPage.Texts[133].R[0].T)).trim()
  //   // const refDocDate = replaceBackSlash(convertedPage.Texts[134].R[0].T)

  //   // console.log(`PPh Pasal: ${incomeTaxArticleNo}`)
  //   // console.log(`No. Bukti Potong: ${incomeTaxCertificateNo}`)
  //   // console.log(`Wajib Pajak: ${taxPayerNPWPNo} - ${taxPayer}`)
  //   // console.log(`--------------------------------------------`)
  //   // console.log(`Masa Pajak: ${taxPeriod}`)
  //   // console.log(`Kode Objek Pajak: ${taxObjectCode}`)
  //   // console.log(`Jumlah Penghasilan Bruto (Rp): ${grossIncome}`)
  //   // console.log(`Tarif Lebih Tinggi 100%: ${extraTariff}`)
  //   // console.log(`Tarif (%): ${tariff}`)
  //   // console.log(`PPh Dipotong (Rp): ${incomeTax}`)
  //   // console.log(`--------------------------------------------`)
  //   // console.log(`Dok. Referensi: ${refDocName} - ${refDocNo} - ${refDocDate}`)
  // });

  // -------------------------------------------------------- pdf-parse Test --------------------------------------------------------
  // // let dataBuffer = fs.readFileSync('./doc/tax.pdf');
  // let dataBuffer = fs.readFileSync('./doc/Birotika 3300000190.pdf');
  // pdf(dataBuffer).then(function(data) {
  //   // // number of pages
  //   // console.log('0', data.numpages);
  //   // // number of rendered pages
  //   // console.log('1', data.numrender);
  //   // // PDF info
  //   // console.log('2', data.info);
  //   // // PDF metadata
  //   // console.log('3', data.metadata); 
  //   // // PDF.js version
  //   // // check https://mozilla.github.io/pdf.js/getting_started/
  //   // console.log('4', data.version);
  //   // // PDF text
  //   // console.log('5', data.text);

  //   const text = data.text
  //   const texts = text.split("\n").slice(100, 120)
  //   console.log('check:', texts)
  // });

  res.send("Done");
}

module.exports = {
  pdfParserHook
}