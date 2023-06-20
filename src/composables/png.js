import { Canvg } from "canvg";

export const getPNG = async (canvas, val, width, height) => {
    canvas.value.height = height;
    canvas.value.width = width;
    const ctx = canvas.value?.getContext("2d");

    const cvsBarcode = new OffscreenCanvas(width / 4, width / 4);
    const ctxBarcode = cvsBarcode.getContext("2d");
    const svgBarcode = Canvg.fromString(ctxBarcode, val);
    await svgBarcode.start();

    const cvsComposite = new OffscreenCanvas(width, height);
    const ctxComposite = cvsComposite.getContext("2d");
    ctxComposite.drawImage(cvsBarcode, 20, 50);

    const blbComposite = await cvsComposite.convertToBlob();

    return await blbComposite.arrayBuffer();
}