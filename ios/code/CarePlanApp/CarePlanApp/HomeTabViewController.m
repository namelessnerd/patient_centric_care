//
//  HomeTabViewController.m
//  CarePlanApp
//
//  Created by Karthik Gomadam on 8/1/13.
//  Copyright (c) 2013 Accenture. All rights reserved.
//

#import "HomeTabViewController.h"

@interface HomeTabViewController ()

@end

@implementation HomeTabViewController

@synthesize homeTabTopBar, chartContainerView;
NSMutableArray * values;
NSMutableArray * times;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        UIImage* image3 = [UIImage imageNamed:@"top_left.png"];
        CGRect frameimg = CGRectMake(0, 0, image3.size.width, image3.size.height);
        UIButton *someButton = [[UIButton alloc] initWithFrame:frameimg];
        [someButton setBackgroundImage:image3 forState:UIControlStateNormal];
        [someButton addTarget:self action:@selector(backToMenu:)
             forControlEvents:UIControlEventTouchUpInside];
        [someButton setShowsTouchWhenHighlighted:YES];
        UIBarButtonItem *mailbutton =[[UIBarButtonItem alloc] initWithCustomView:someButton];
        self.navigationItem.leftBarButtonItem=mailbutton;
        // Custom initialization
    }
    return self;
}

-(void) printHeight{
    NSLog(@"%f", CGRectGetHeight(self.chartContainerView.bounds));
}

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view.
    
    

    
    CGRect frame = CGRectMake(5.0,5.0, 310,305);
    
    activityOverviewChart = [[ShinobiChart alloc] initWithFrame:frame];
    activityOverviewChart.title = @"Overview of your activity";
    activityOverviewChart.licenseKey=@"BBXRnG1CvEbSVgBMjAxMzA4MzFpbmZvQHNoaW5vYmljb250cm9scy5jb20=U8JMpV2F02LHKsfncgV0Ev/wKpqYUs7qZlPbtvcUiTbwPwnzZrW2eBvUplyWY8v6CcUiBScjlFaj/J+IEes8Rnmn4xGCDB23oLGxltdEC2yiOefBcGLfZi8XBfmGQQF1sAY69uVcpuLHdToGCWwsam0Y3nyo=BQxSUisl3BaWf/7myRmmlIjRnMU2cA7q+/03ZX9wdj30RzapYANf51ee3Pi8m2rVW6aD7t6Hi4Qy5vv9xpaQYXF5T7XzsafhzS3hbBokp36BoJZg8IrceBj742nQajYyV7trx5GIw9jy/V6r0bvctKYwTim7Kzq+YPWGMtqtQoU=PFJTQUtleVZhbHVlPjxNb2R1bHVzPnh6YlRrc2dYWWJvQUh5VGR6dkNzQXUrUVAxQnM5b2VrZUxxZVdacnRFbUx3OHZlWStBK3pteXg4NGpJbFkzT2hGdlNYbHZDSjlKVGZQTTF4S2ZweWZBVXBGeXgxRnVBMThOcDNETUxXR1JJbTJ6WXA3a1YyMEdYZGU3RnJyTHZjdGhIbW1BZ21PTTdwMFBsNWlSKzNVMDg5M1N4b2hCZlJ5RHdEeE9vdDNlMD08L01vZHVsdXM+PEV4cG9uZW50PkFRQUI8L0V4cG9uZW50PjwvUlNBS2V5VmFsdWU+";
    
    
    // Use a number axis for the x axis.
    SChartCategoryAxis *xAxis = [[SChartCategoryAxis alloc] init];
    activityOverviewChart.xAxis = xAxis;
    
    // Use a number axis for the y axis.
    SChartNumberAxis *yAxis = [[SChartNumberAxis alloc] init];
    activityOverviewChart.yAxis = yAxis;
    
        
    values= [[NSMutableArray alloc]initWithObjects:[NSNumber numberWithDouble:52.0], [NSNumber numberWithDouble:57.0],[NSNumber numberWithDouble:65.4], [NSNumber numberWithDouble:80.0], [NSNumber numberWithDouble:89.0], [NSNumber numberWithDouble:82.0], [NSNumber numberWithDouble:84.0],  nil];
    
    
    times= [[NSMutableArray alloc]initWithObjects:@"Wake Up", @"Breakfast",@"Lunch", @"Evening",@"Dinner",nil];
    
    activityOverviewChart.datasource= self;
    // Add the chart to the view controller
    [self.chartContainerView addSubview:activityOverviewChart];
    [self printHeight];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void) backToMenu:(id)sender{
    [self dismissViewControllerAnimated:YES completion:nil];
}

- (int)numberOfSeriesInSChart:(ShinobiChart *)chart {
    return 1;
}

// Returns the series at the specified index for a given chart
-(SChartSeries *)sChart:(ShinobiChart *)chart seriesAtIndex:(int)index {
    
    // In our example all series are line series.
    SChartLineSeries *lineSeries = [[SChartLineSeries alloc] init];
    
    // Set up the series
    lineSeries.title = [NSString stringWithFormat:@"y = x ^ %d", index+1];
    
    if (index == 0) {
        lineSeries.style.showFill = YES;
        lineSeries.style.areaColor = [UIColor orangeColor];
        lineSeries.style.areaColorLowGradient = [UIColor yellowColor];
    }
    return lineSeries;
}

// Returns the number of points for a specific series in the specified chart
- (int)sChart:(ShinobiChart *)chart numberOfDataPointsForSeriesAtIndex:(int)seriesIndex {
    // In this example each series has 100 points
    return [times count];
}

// Returns the data point at the specified index for the given series/chart.
- (id<SChartData>)sChart:(ShinobiChart *)chart dataPointAtIndex:(int)dataIndex forSeriesAtIndex:(int)seriesIndex {
    
//    //Construct a data point to return
//    SChartDataPoint *datapoint = [[SChartDataPoint alloc] init];
//    
//    datapoint.xValue =@"Sunday";
//    datapoint.yValue =[values objectAtIndex:seriesIndex];
//    
//    return datapoint;
    //Construct a data point to return
    SChartDataPoint *datapoint = [[SChartDataPoint alloc] init];
    
    double xValue = dataIndex /50.0;
    NSLog(@"%@", [NSNumber numberWithInt:dataIndex]);
    datapoint.xValue = [times objectAtIndex:dataIndex];
    datapoint.yValue = [values objectAtIndex:dataIndex];//[NSNumber numberWithDouble:pow(xValue, seriesIndex + 1)];
    
    return datapoint;
}
@end
