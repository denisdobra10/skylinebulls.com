import React from 'react';
import { Sparkles, Zap, ChevronRight } from 'lucide-react';

const aiServices = [
  {
    icon: <span className="text-[--primary-red]">🤖</span>,
    name: "AI Chatbots & Virtual Assistants",
    description: "Deploy intelligent chatbots and virtual assistants to automate customer support and engagement.",
    integrations: ["OpenAI", "Dialogflow", "Microsoft Bot", "Rasa"],
    features: [
      "24/7 Customer Support",
      "Multi-Channel Integration",
      "Natural Language Understanding",
      "Custom Workflows",
      "Analytics & Reporting"
    ]
  },
  {
    icon: <span className="text-[--primary-red]">🧠</span>,
    name: "Machine Learning Solutions",
    description: "Advanced ML models for predictive analytics and decision making",
    integrations: ["TensorFlow", "PyTorch", "Scikit-learn", "AWS SageMaker"],
    features: ["Predictive Analytics", "Pattern Recognition", "Data Mining", "Model Training"]
  },
  {
    icon: <span className="text-[--primary-red]">🔄</span>,
    name: "Workflow Automation",
    description: "End-to-end automation solutions for business processes",
    integrations: ["Zapier", "Make", "Power Automate", "n8n"],
    features: ["Process Automation", "Custom Workflows", "Integration Hub", "Error Handling", "AI-Powered Agents"]
  },
  {
    icon: <span className="text-[--primary-red]">🌿</span>,
    name: "LLM Integration",
    description: "Seamless integration of Large Language Models into your systems",
    integrations: ["GPT-4", "Claude", "PaLM", "Llama"],
    features: ["API Integration", "Custom Training", "Prompt Engineering", "Response Optimization", "Human-in-the-Loop"]
  }
];

const AISection: React.FC = () => (
  <section id="ai-services" className="section relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-[--primary-red]/5 to-black/20"></div>
    <div className="container mx-auto px-4 relative">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          AI & Automation
          <span className="block text-[--primary-red] mt-2">All in One Place</span>
        </h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Explore AI and automation solutions from industry leaders to create powerful,
          reliable systems that transform your business operations.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 items-stretch">
        {aiServices.map((service, index) => (
          <div
            key={index}
            className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 pb-8 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-[--primary-red]/50 flex flex-col h-full"
          >
            <div className="flex-1 flex flex-col">
              <div className="text-[--primary-red] mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.name}</h3>
              <p className="text-white/70 mb-6 text-sm">{service.description}</p>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-[--primary-red] mb-2">Integrations</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.integrations.map((integration, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                        {integration}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[--primary-red] mb-2">Features</h4>
                  <div className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-white/70">
                        <Sparkles className="h-3 w-3 mr-2 text-[--primary-red]" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <button className="w-full py-2 px-4 rounded-lg bg-[--primary-red]/10 hover:bg-[--primary-red]/20 text-[--primary-red] transition-all duration-300 flex items-center justify-center gap-2">
                Learn More <Zap className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <a href="#contact" className="btn-primary flex items-center gap-2">
          Get Started with AI <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  </section>
);

export default AISection; 