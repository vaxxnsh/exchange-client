import {
  ColorType,
  createChart,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
  UTCTimestamp,
  CandlestickData,
  DeepPartial,
  ChartOptions,
  IRange,
  Time,
  CandlestickSeries,
} from "lightweight-charts";

interface InitialCandleData {
  open: number;
  high: number;
  low: number;
  close: number;
  timestamp: number; 
}

interface PriceUpdate {
  open: number;
  high: number;
  low: number;
  close: number;
  time?: number; 
  newCandleInitiated?: boolean;
}

interface ChartLayout {
  background: string;
  color: string;
}

interface CurrentBar {
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
}

export class ChartManager {
  private candleSeries: ISeriesApi<"Candlestick">;
  private lastUpdateTime: number = 0;
  private chart: IChartApi;
  private currentBar: CurrentBar = {
    open: null,
    high: null,
    low: null,
    close: null,
  };

  constructor(
    ref: HTMLElement,
    initialData: InitialCandleData[],
    layout: ChartLayout
  ) {
    const chartOptions: DeepPartial<ChartOptions> = {
      autoSize: true,
      overlayPriceScales: {
        ticksVisible: true,
        borderVisible: true,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        visible: true,
        ticksVisible: true,
        entireTextOnly: true,
      },
      grid: {
        horzLines: {
          visible: false,
        },
        vertLines: {
          visible: false,
        },
      },
      layout: {
        background: {
          type: ColorType.Solid,
          color: layout.background,
        },
        textColor: "white",
      },
    };

    this.chart = createChart(ref, chartOptions);
    
    // Fixed: Use the correct method name for version 5+
    this.candleSeries = this.chart.addSeries(CandlestickSeries,{
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    // Transform initial data to match CandlestickData format
    const formattedData: CandlestickData[] = initialData.map((data) => ({
      open: data.open,
      high: data.high,
      low: data.low,
      close: data.close,
      time: (data.timestamp / 1000) as UTCTimestamp,
    }));

    this.candleSeries.setData(formattedData);
  }

  public update(updatedPrice: PriceUpdate): void {
    if (!this.lastUpdateTime) {
      this.lastUpdateTime = new Date().getTime();
    }

    // Create the candlestick data point
    const candleData: CandlestickData = {
      time: (this.lastUpdateTime / 1000) as UTCTimestamp,
      close: updatedPrice.close,
      low: updatedPrice.low,
      high: updatedPrice.high,
      open: updatedPrice.open,
    };

    this.candleSeries.update(candleData);

    // Update the last update time if a new candle was initiated
    if (updatedPrice.newCandleInitiated && updatedPrice.time) {
      this.lastUpdateTime = updatedPrice.time;
    }
  }

  public destroy(): void {
    this.chart.remove();
  }

  // Additional helper methods with proper typing
  public getCurrentBar(): CurrentBar {
    return { ...this.currentBar };
  }

  public updateCurrentBar(bar: Partial<CurrentBar>): void {
    this.currentBar = { ...this.currentBar, ...bar };
  }

  public getChart(): IChartApi {
    return this.chart;
  }

  public getCandleSeries(): ISeriesApi<"Candlestick"> {
    return this.candleSeries;
  }

  // Method to resize chart (useful for responsive layouts)
  public resize(width: number, height: number): void {
    this.chart.resize(width, height);
  }

  // Method to fit content to chart
  public fitContent(): void {
    this.chart.timeScale().fitContent();
  }

  public getVisibleRange(): IRange<Time> | null {
    return this.chart.timeScale().getVisibleRange();
  }
}