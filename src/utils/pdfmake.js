const pdfmake = require("pdfmake")

const fonts = {
    Roboto: {
        normal: 'public/user/Roboto/static/Roboto-Regular.ttf',
        bold: 'public/user/Roboto/static/Roboto-Medium.ttf',
        italics: 'public/user/Roboto/static/Roboto-Italic.ttf',
        bolditalics: 'public/user/Roboto/static/Roboto-MediumItalic.ttf'
    }
};

var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

const Createpdf = async (docDefinition, name) => {
    try {
        var pdfDoc = await printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(fs.createWriteStream(`public/user_pdf/${name}.pdf`));
        pdfDoc.end();
    } catch (error) {
        console.log(error);
    }
}

module.exports = Createpdf