//
//  PushNative.h
//  app
//
//  Created by xb on 2018/12/26.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
// 导入RCTBridgeModule类，这个是react-native提供
#import "React/RCTBridgeModule.h"
// 遵守RCTBridgeModul协议
@interface PushNative : NSObject<RCTBridgeModule>
@end

