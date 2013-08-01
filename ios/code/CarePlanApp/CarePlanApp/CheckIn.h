//
//  CheckIn.h
//  CarePlanApp
//
//  Created by Karthik Gomadam on 7/31/13.
//  Copyright (c) 2013 Accenture. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface CheckIn : NSObject
{
NSString * checkInTask;
BOOL checkInStatus;
}

-(id) initWithCheckInTask: (NSString *)taskName AndCheckInStatus:(BOOL) status;
-(NSString *)getCheckInTask;
-(BOOL) getCheckInStatus;
@end
