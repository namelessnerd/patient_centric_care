//
//  HttpClient.h
//  Created by Karthik Gomadam on 6/15/13.
//  Copyright (c) 2013 Accenture. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <Foundation/Foundation.h>

@protocol HTTPResponseDelegate <NSObject>
@required
- (void) processHttpResponse: (id)http_response;
@end

@interface HttpClient : NSObject <NSURLConnectionDataDelegate>{
    id <HTTPResponseDelegate> http_response_delegate;
}

@property (nonatomic, weak) NSString * rest_url;
@property (nonatomic, weak) id <HTTPResponseDelegate> http_response_delegate;
@property (nonatomic, strong) NSMutableData * received_data;
@property (nonatomic, strong) NSURLConnection * url_connection;
- (void)loadURL:(NSURL *)url with_message:(NSDictionary *) message_body;

@end
