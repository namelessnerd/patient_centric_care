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

+ (CheckInHistoryManager *) getgaleChatMessageControls{
    if (!(_checkInHistoryManager)){
        _checkInHistoryManager= [[CheckInHistoryManager alloc]init];
        return _checkInHistoryManager;
    }
    return _checkInHistoryManager;
    
}

-(void) addCheckin: (CheckIn *) currentCheckIn{
    [[self userCheckIns]addObject:currentCheckIn];
}

-(void) clearChatMessages{
    [[self userCheckIns]removeAllObjects];
}


// need to understand clearly how the object reuse actually works for cell.
-(UITableViewCell *) getCheckin:(int) currentCheckinPosition{
    
    UITableViewCell * tableViewCell= [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:@"userMessageCell"];
    CheckIn * currentCheckin= [[self userCheckIns]objectAtIndex:currentCheckinPosition];
    tableViewCell.textLabel.text= currentCheckin.checkInTask;
  
    tableViewCell.imageView.image=currentCheckin.checkInStatus ? [UIImage imageNamed:@""] : [UIImage imageNamed:@""];
    return tableViewCell;
    
}

@end




