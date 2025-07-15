// import UIKit
// import React
// import React_RCTAppDelegate
// import ReactAppDependencyProvider
// import Firebase
// import RNBootSplash // ⬅️ Import RNBootSplash

// @main
// class AppDelegate: UIResponder, UIApplicationDelegate {
//   var window: UIWindow?

//   var reactNativeDelegate: ReactNativeDelegate?
//   var reactNativeFactory: RCTReactNativeFactory?

//   func application(
//     _ application: UIApplication,
//     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
//   ) -> Bool {
//     FirebaseApp.configure()
//     let delegate = ReactNativeDelegate()
//     let factory = RCTReactNativeFactory(delegate: delegate)
//     delegate.dependencyProvider = RCTAppDependencyProvider()

//     reactNativeDelegate = delegate
//     reactNativeFactory = factory

//     window = UIWindow(frame: UIScreen.main.bounds)

//     factory.startReactNative(
//       withModuleName: "firebaseappauth",
//       in: window,
//       launchOptions: launchOptions
//     )

//     return true
//   }
// }

// class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
//   override func sourceURL(for bridge: RCTBridge) -> URL? {
//     self.bundleURL()
//   }

//   override func bundleURL() -> URL? {
//     #if DEBUG
//     RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
//     #else
//     Bundle.main.url(forResource: "main", withExtension: "jsbundle")
//     #endif
//   }
  
//   // ⬅️ Add this method to initialize RNBootSplash with your rootView
//   override func createRootView(bridge: RCTBridge, moduleName: String, initialProperties: [AnyHashable : Any]?) -> UIView {
//     let rootView = super.createRootView(bridge: bridge, moduleName: moduleName, initialProperties: initialProperties)
    
//     RNBootSplash.initWithStoryboard("BootSplash", rootView: rootView) // Initialize splash screen
    
//     return rootView
//   }
// }
















import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import Firebase
import RNBootSplash // ⬅️ Import RNBootSplash


@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    FirebaseApp.configure()
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "firebaseappauth",
      in: window,
      launchOptions: launchOptions
    )

    return true
  }

  func createRootView(withBridge bridge: RCTBridge, moduleName: String, initialProperties: [AnyHashable: Any]?) -> UIView {
    let rootView = RCTRootView(bridge: bridge, moduleName: moduleName, initialProperties: initialProperties)

    RNBootSplash.initWithStoryboard("BootSplash", rootView: rootView) // ⬅️ initialize the splash screen

    return rootView
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
