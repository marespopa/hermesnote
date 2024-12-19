import { MutableRefObject, RefObject } from "react";
import { jsPDFOptions } from "jspdf";
import { Options as Html2CanvasOptions } from "html2canvas";

export enum Resolution {
    LOW = 1,
    NORMAL = 2,
    MEDIUM = 3,
    HIGH = 7,
    EXTREME = 12,
  }
  
  export enum Margin {
    NONE = 0,
    SMALL = 5,
    MEDIUM = 10,
    LARGE = 25,
  }

export type DetailedMargin = {
  top: Margin | number;
  right: Margin | number;
  bottom: Margin | number;
  left: Margin | number;
};

type PageConversionOptions = {
  /** Margin of the page in MM, defaults to 0. */
  margin: DetailedMargin | Margin | number;
  /** Format of the page (A4, letter), defaults to A4. */
  format: jsPDFOptions["format"];
  /** Orientation of the page (portrait or landscape), defaults to `portrait`. */
  orientation: jsPDFOptions["orientation"];
};

type CanvasConversionOptions = Pick<
  Html2CanvasOptions,
  "useCORS" | "logging"
> & {
  /**
   * Mime type of the canvas captured from the screenshot, defaults to
   * 'image/jpeg' for better size performance.
   * See: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
   */
  mimeType: "image/jpeg" | "image/png";
  /**
   * Quality ratio of the canvas captured from the screenshot
   * See: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
   */
  qualityRatio: number;
};

export type ConversionOptions = {
  filename?: string;
  /**
   * Resolution in a scale where 1 gives a low resolution and possible blurred
   * image, 3 a medium and 10 an extreme quality. The size of the file increases
   * as the resolution is higher. Not recommended to use extreme resolution, e.g
   * '>= 10' for multiple pages otherwise this can make the browser cache hang
   * or crash, due to the size of the image generated for the PDF.
   */
  resolution: Resolution;
  /** Page options */
  page: PageConversionOptions;
  /** Canvas options */
  canvas: CanvasConversionOptions;
  /** Override values passed for the jsPDF document and html2canvas */
  overrides: {
    /**
     * Override the values passed for the jsPDF instance. See its docs for more details
     * in https://artskydj.github.io/jsPDF/docs/jsPDF.html.
     * */
    pdf?: Partial<jsPDFOptions>;
    /**
     * Override the values passed for the html2canvas function. See its docs
     * for more details in https://html2canvas.hertzen.com/documentation
     * */
    canvas?: Partial<Html2CanvasOptions>;
  };
};

export type Options = Omit<
  Partial<ConversionOptions>,
  "page" | "canvas" | "overrides"
> & {
  page?: Partial<PageConversionOptions>;
  canvas?: Partial<CanvasConversionOptions>;
  overrides?: Partial<ConversionOptions["overrides"]>;
};

export type UsePDFResult = {
  /**
   * React ref of the target element
   */
  targetRef: MutableRefObject<any>;
  /**
   * Generates the pdf
   */
  toPDF: (options?: Options) => void;
};

export type TargetElementFinder =
  | RefObject<any>
  | (() => HTMLElement | null);