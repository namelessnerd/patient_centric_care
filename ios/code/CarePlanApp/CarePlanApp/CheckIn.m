//
//  CheckIn.m
//  CarePlanApp
//
//  Created by Karthik Gomadam on 7/31/13.
//  Copyright (c) 2013 Accenture. All rights reserved.
//

#import "CheckIn.h"

@implementation CheckIn




-(id) initWithCheckInTask: (NSString *)taskName AndCheckInStatus:(BOOL) status{
    self=[super init];
    if (self){
        checkInTask= taskName;
        checkInStatus= status;
    }
    return self;
}

-(NSString *)getCheckInTask{
    return checkInTask;
}

-(BOOL) getCheckInStatus{
    return checkInStatus;
}

@end
