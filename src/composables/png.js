import { Canvg, presets } from "canvg";

export const getPNG = async (val, width, height) => {

    const preset = presets.offscreen();

    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');
    const v = await Canvg.from(ctx, val, preset);
    await v.render();
    const blob = await canvas.convertToBlob();
    return await blob.arrayBuffer();
}