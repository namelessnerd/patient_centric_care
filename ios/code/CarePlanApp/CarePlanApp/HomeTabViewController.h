//
//  HomeTabViewController.h
//  CarePlanApp
//
//  Created by Karthik Gomadam on 8/1/13.
//  Copyright (c) 2013 Accenture. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <ShinobiCharts/ShinobiChart.h>

@interface HomeTabViewController : UIViewController <SChartDatasource>
{
    ShinobiChart *activityOverviewChart;
}


@property (weak, nonatomic) IBOutlet UIToolbar *homeTabTopBar;

-(void) backToMenu:(id) sender;

@property (weak, nonatomic) IBOutlet UIView *chartContainerView;


@end
