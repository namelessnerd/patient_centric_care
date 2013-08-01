//
//  CheckInHistoryManager.m
//  CarePlanApp
//
//  Created by Karthik Gomadam on 7/31/13.
//  Copyright (c) 2013 Accenture. All rights reserved.
//

#import "CheckInHistoryManager.h"

@implementation CheckInHistoryManager

static CheckInHistoryManager * _checkInHistoryManager= nil;

@synthesize  userCheckIns;

-(id) init{
    self = [super init];
    if (self) {
        userCheckIns= [[NSMutableArray alloc]init];
    }
    return self;
}

+ (CheckInHistoryManager *) getUserCheckinHistoryManager{
    if (!(_checkInHistoryManager)){
        _checkInHistoryManager= [[CheckInHistoryManager alloc]init];
        return _checkInHistoryManager;
    }
    return _checkInHistoryManager;
    
}

-(void) addCheckin: (CheckIn *) currentCheckIn{
    [[self userCheckIns]addObject:currentCheckIn];
}

-(void) removeCheckins{
    [[self userCheckIns]removeAllObjects];
}


// need to understand clearly how the object reuse actually works for cell.
-(UITableViewCell *) getCheckin:(int) currentCheckinPosition{
    
    UITableViewCell * tableViewCell= [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:@"userMessageCell"];
    CheckIn * currentCheckin= [[self userCheckIns]objectAtIndex:currentCheckinPosition];

    tableViewCell.textLabel.text= [currentCheckin getCheckInTask];
    
    tableViewCell.textLabel.font= [UIFont fontWithName:@"HelveticaNeue-Medium" size:19.0];
    tableViewCell.textLabel.textColor = [UIColor whiteColor];
    tableViewCell.imageView.image=[currentCheckin getCheckInStatus] ? [UIImage imageNamed:@"checkmark_small.png"] : [UIImage imageNamed:@"crossmark_small.png"];
    return tableViewCell;
    
}

@end




