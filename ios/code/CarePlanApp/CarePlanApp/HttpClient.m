//
//  galeHttpClient.m
//  gale
//
//  Created by Karthik Gomadam on 6/15/13.
//  Copyright (c) 2013 ConverseAgent. All rights reserved.
//




//
//  HTTPClient.m
//  Gale
//
//  Created by Karthik Gomadam on 1/30/13.
//  Copyright (c) 2013 Jarple Inc. All rights reserved.
//

#import "HttpClient.h"


@implementation HttpClient


@synthesize received_data= _received_data;
@synthesize rest_url= _rest_url;
@synthesize url_connection= _url_connection;
@synthesize http_response_delegate= _http_response_delegate;


- (void)loadURL:(NSURL *)url with_message:(NSDictionary *) message_body{
    // Cancel any load currently in progress
    [self cancelLoad];
    
    NSLog(@"inside loading");
    // Create an empty data to receive bytes from the download
    _received_data = [[NSMutableData alloc] init];
    
    // Start the download
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    
    [request setHTTPMethod:@"POST"];
    
    [request setValue:@"application/x-www-form-urlencoded; charset=utf-8" forHTTPHeaderField:@"Content-Type"];
    NSMutableString * query_string= [[NSMutableString alloc]init];
    
    NSEnumerator *enumerator = [message_body keyEnumerator];
    id key;
    
    
    while ((key = [enumerator nextObject])) {
        //NSString * querystring= [[key stringByAppendingString:[@"=" stringByAppendingString:[message_body objectForKey:key]]] stringByAppendingString:@"&"];
        [query_string appendString:[[key stringByAppendingString:[@"=" stringByAppendingString:[message_body objectForKey:key]]] stringByAppendingString:@"&"]];
        
    }
    
    [query_string deleteCharactersInRange:NSMakeRange([query_string length]-1, 1)];
    //NSLog(@"The query string is %@", url);
    
    
    [request setHTTPBody:[query_string dataUsingEncoding:NSUTF8StringEncoding]];
    
    _url_connection = [[NSURLConnection alloc] initWithRequest:request delegate:self];
    
}

- (void)cancelLoad {
    if (_url_connection) {
        [_url_connection cancel];
        _url_connection = nil;
    }
    if (_received_data) {
        _received_data = nil;
    }
}

/* NSURLConnection delegate methods */
- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)newData {
    //NSLog(@"%@", newData);
    [_received_data appendData:newData];
}

- (void)connectionDidFinishLoading:(NSURLConnection *)connection {
    //NSString * response = [[NSString alloc] initWithData:_received_data encoding:NSUTF8StringEncoding];
    NSError *jsonParsingError = nil;
    id object = [NSJSONSerialization JSONObjectWithData:_received_data options:0 error:&jsonParsingError];
    
    if (jsonParsingError) {
        NSLog(@"JSON ERROR: %@", [jsonParsingError localizedDescription]);
    } else {
        //NSLog(@"Delegate will get called");
        [_http_response_delegate processHttpResponse:object];
        
    }
    
    [self cancelLoad]; // This shuts down the connection for us
}

- (void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error {
    NSLog(@"%@",error);
    [self cancelLoad]; // This shuts down the connection for us
}

@end
