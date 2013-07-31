//
//  CheckInHistoryManager.h
//  CarePlanApp
//
//  Created by Karthik Gomadam on 7/31/13.
//  Copyright (c) 2013 Accenture. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CheckIn.h"

@interface CheckInHistoryManager : NSObject
  @property (nonatomic, retain)NSMutableArray * userCheckIns;
  + (CheckInHistoryManager *) getgaleChatMessageControls;

-(void) addCheckin: (CheckIn *) currentCheckIn;

-(void) clearChatMessages;

-(UITableViewCell *) getCheckin:(int) currentCheckinPosition;

@end










