"use client";

const activities = [
  {
    title: "New Product Added",
    desc: "Organic Tomato added to inventory",
    time: "Today • 10:45 AM",
    color: "bg-green-500",
  },
  {
    title: "Order Delivered",
    desc: "Order #ORD-1021 delivered",
    time: "Today • 09:20 AM",
    color: "bg-blue-500",
  },
  {
    title: "Coupon Created",
    desc: "SAVE20 coupon activated",
    time: "Yesterday",
    color: "bg-orange-500",
  },
  {
    title: "Customer Registered",
    desc: "A new customer joined",
    time: "Yesterday",
    color: "bg-purple-500",
  },
];

export default function ActivityTimeline() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

      <h2 className="text-xl font-bold mb-8">
        Recent Activity
      </h2>

      <div className="space-y-8">

        {activities.map((item, index) => (

          <div
            key={index}
            className="flex gap-5"
          >

            <div className="flex flex-col items-center">

              <div className={`w-4 h-4 rounded-full ${item.color}`} />

              {index !== activities.length - 1 && (
                <div className="w-0.5 flex-1 bg-gray-200 mt-2" />
              )}

            </div>

            <div>

              <h4 className="font-semibold">
                {item.title}
              </h4>

              <p className="text-gray-500 mt-1">
                {item.desc}
              </p>

              <span className="text-xs text-gray-400">
                {item.time}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}