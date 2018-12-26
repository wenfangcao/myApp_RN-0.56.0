/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "LWQRCodeViewController.h"
#import <CloudPushSDK/CloudPushSDK.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"app"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  
  // 用原生导航替代rn
  _nav = [[UINavigationController alloc]initWithRootViewController:rootViewController];
  self.window.rootViewController = _nav;
//  self.window.rootViewController = [[LWQRCodeViewController alloc] init];
//  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [self initCloudPush];
  return YES;
}


- (void)initCloudPush {
  // SDK初始化
  [CloudPushSDK asyncInit:@"25447832" appSecret:@"8d8a09172abcb60e940513fafe627f8c" callback:^(CloudPushCallbackResult *res) {
    if (res.success) {
      NSLog(@"Push SDK init success, deviceId: %@.", [CloudPushSDK getDeviceId]);
    } else {
      NSLog(@"Push SDK init failed, error: %@", res.error);
    }
  }];
}
- (void)registerAPNS:(UIApplication *)application {
  if ([[[UIDevice currentDevice] systemVersion] floatValue] >= 8.0) {
    // iOS 8 Notifications
    [application registerUserNotificationSettings:
     [UIUserNotificationSettings settingsForTypes:
      (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge)
                                       categories:nil]];
    [application registerForRemoteNotifications];
  }
  else {
    // iOS < 8 Notifications
    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:
     (UIRemoteNotificationTypeAlert | UIRemoteNotificationTypeBadge | UIRemoteNotificationTypeSound)];
  }
}
/*
 *  苹果推送注册成功回调，将苹果返回的deviceToken上传到CloudPush服务器
 */
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [CloudPushSDK registerDevice:deviceToken withCallback:^(CloudPushCallbackResult *res) {
    if (res.success) {
      NSLog(@"upload token success");
      NSLog(@"%@", res);
      NSLog(@"Register deviceToken success.");
    } else {
      NSLog(@"Register deviceToken failed, error: %@", res.error);
    }
  }];
}
/*
 *  苹果推送注册失败回调
 */
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  NSLog(@"didFailToRegisterForRemoteNotificationsWithError %@", error);
}
@end
