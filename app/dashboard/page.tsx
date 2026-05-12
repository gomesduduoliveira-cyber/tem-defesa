'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

const IS: React.CSSProperties = { width: '100%', padding: '10px 13px', borderRadius: 8, background: '#0d1020', border: '1px solid #2a304a', color: '#f0ebe0', boxSizing: 'border-box', fontSize: 13, fontFamily: 'inherit', outline: 'none' };
const LS: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 600, color: '#8892aa', textTransform: 'uppercase', letterSpacing: '.05em', margin: '0 0 5px' };

const ADMIN_EMAIL = 'gomesduduoliveira@gmail.com';

type Passo = 'upload' | 'confirmar' | 'entrevista' | 'fora_escopo' | 'concluido';

interface Pergunta {
    id: string;
    texto: string;
    tipo: 'boolean' | 'texto';
    opcao_sim?: string;
    opcao_nao?: string;
    relevancia?: string;
}

interface Analise {
    fora_do_escopo?: boolean;
    mensagem?: string;
    resumo_infracao?: string;
    estrategias_possiveis?: string[];
    perguntas?: Pergunta[];
}

interface RespostaChat {
    pergunta: string;
    resposta: string;
}

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);
    const [perfil, setPerfil] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarAberta, setSidebarAberta] = useState(false);
    const [historicoAberto, setHistoricoAberto] = useState(false);

    // Fluxo
    const [passo, setPasso] = useState<Passo>('upload');
    const [ficheiro, setFicheiro] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    const [uploadLoading, setUploadLoading] = useState(false);
    const [dadosAuto, setDadosAuto] = useState<any>({});
    const [gerandoDefesa, setGerandoDefesa] = useState(false);
    const [defesaGerada, setDefesaGerada] = useState('');
    const [erro, setErro] = useState('');
    const [defesas, setDefesas] = useState<any[]>([]);
    const [uploadCreditoUsado, setUploadCreditoUsado] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    // Entrevista
    const [analise, setAnalise] = useState<Analise | null>(null);
    const [analisando, setAnalisando] = useState(false);
    const [perguntaAtual, setPerguntaAtual] = useState(0);
    const [respostasChat, setRespostasChat] = useState<RespostaChat[]>([]);
    const [respostaInput, setRespostaInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) { window.location.href = '/login'; return; }
            setUser(session.user);
            const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
            if (data) setPerfil(data);
            else {
                const meta = session.user.user_metadata || {};
                setPerfil({ nome: meta.nome || session.user.email, nif: meta.nif, carta_conducao: meta.carta_conducao, telemovel: meta.telemovel, morada: meta.morada });
            }
            const { data: hist } = await supabase.from('defesas').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false }).limit(20);
            setDefesas(hist || []);
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [respostasChat, perguntaAtual]);

    const handleFicheiro = async (f: File) => {
        setFicheiro(f);
        setErro('');
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string || '');
        reader.readAsDataURL(f);
    };

    const extrairDados = async () => {
        if (!ficheiro) return;
        const isAdmin = user?.email === ADMIN_EMAIL;
        const assinante = perfil?.is_assinante;
        const creditos = perfil?.creditos || 0;
        if (!isAdmin && !assinante && creditos <= 0) { setErro('Sem créditos disponíveis. Adquira um plano para continuar.'); return; }
        setUploadLoading(true); setErro('');
        try {
            const reader = new FileReader();
            const base64 = await new Promise<string>((res, rej) => {
                reader.onload = (e) => res((e.target?.result as string).split(',')[1]);
                reader.onerror = rej;
                reader.readAsDataURL(ficheiro);
            });
            const r = await fetch('/api/extrair-auto', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ base64, mimeType: ficheiro.type }) });
            const { dados, error } = await r.json();
            if (error) throw new Error(error);
            setDadosAuto(dados || {});
            if (!isAdmin && !assinante) {
                await supabase.from('profiles').update({ creditos: creditos - 1 }).eq('id', user.id);
                setPerfil((p: any) => ({ ...p, creditos: creditos - 1 }));
                setUploadCreditoUsado(true);
            }
            setPasso('confirmar');
        } catch {
            setErro('Não foi possível extrair os dados. Preencha manualmente.');
            setDadosAuto({});
            setPasso('confirmar');
        }
        setUploadLoading(false);
    };

    const handleAnalisarAuto = async () => {
        setAnalisando(true); setErro('');
        try {
            const res = await fetch('/api/analisar-auto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ infracao: dadosAuto.infracao, artigoLE: dadosAuto.artigoLE, autoridade: dadosAuto.autoridade, detalhes: dadosAuto.detalhes })
            });
            const dados: Analise = await res.json();
            if ((dados as any).error) throw new Error((dados as any).error);
            if (dados.fora_do_escopo) {
                setAnalise(dados);
                setPasso('fora_escopo');
                return;
            }
            setAnalise(dados);
            setPerguntaAtual(0);
            setRespostasChat([]);
            setPasso('entrevista');
        } catch {
            setErro('Erro ao analisar a contraordenação. Tente novamente.');
        } finally {
            setAnalisando(false);
        }
    };

    const handleResponder = (resposta: string) => {
        if (!analise?.perguntas || !resposta.trim()) return;
        const nova: RespostaChat = { pergunta: analise.perguntas[perguntaAtual].texto, resposta };
        setRespostasChat(prev => [...prev, nova]);
        setRespostaInput('');
        if (perguntaAtual < analise.perguntas.length - 1) {
            setPerguntaAtual(prev => prev + 1);
        }
    };

    const todasRespondidas = analise?.perguntas ? respostasChat.length >= analise.perguntas.length : false;

    const gerarDefesa = async () => {
        const isAdmin = user?.email === ADMIN_EMAIL;
        const assinante = perfil?.is_assinante;
        const creditos = perfil?.creditos || 0;
        if (!isAdmin && !assinante && !uploadCreditoUsado && creditos <= 0) { setErro('Sem créditos disponíveis. Adquira um plano para continuar.'); return; }
        setGerandoDefesa(true); setErro('');
        try {
            const r = await fetch('/api/gerar-defesa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dadosAuto,
                    dadosArguido: perfil,
                    relato: '',
                    userId: user?.id,
                    respostas: respostasChat,
                    estrategias: analise?.estrategias_possiveis
                }),
            });
            const { defesa, error } = await r.json();
            if (error) throw new Error(error);
            setDefesaGerada(defesa);
            setPasso('concluido');
            if (!isAdmin && !assinante && !uploadCreditoUsado) {
                await supabase.from('profiles').update({ creditos: creditos - 1 }).eq('id', user.id);
                setPerfil((p: any) => ({ ...p, creditos: creditos - 1 }));
            }
            const { data: hist } = await supabase.from('defesas').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(20);
            setDefesas(hist || []);
        } catch (e: any) {
            setErro('Erro ao gerar a defesa: ' + (e.message || 'Tente novamente.'));
        }
        setGerandoDefesa(false);
    };

    const transferirDefesa = () => {
        const blob = new Blob(['﻿' + defesaGerada], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `defesa-${dadosAuto?.matricula || 'auto'}-${new Date().toISOString().slice(0, 10)}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const reiniciar = () => {
        setPasso('upload'); setFicheiro(null); setPreview('');
        setDadosAuto({}); setDefesaGerada(''); setErro('');
        setUploadCreditoUsado(false); setAnalise(null);
        setPerguntaAtual(0); setRespostasChat([]); setRespostaInput('');
    };

    if (loading) return (
        <div style={{ minHeight: '100vh', background: '#0b0e18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="spinner" style={{ width: 32, height: 32, borderWidth: 3 }} />
        </div>
    );

    const perguntaCorrente = analise?.perguntas?.[perguntaAtual];
    const passoLabels: Record<string, string> = { upload: 'Documento', confirmar: 'Dados', entrevista: 'Perguntas' };
    const passosVisiveis: Passo[] = ['upload', 'confirmar', 'entrevista'];

    return (
        <div style={{ minHeight: '100vh', background: '#0b0e18', color: '#f0ebe0', display: 'flex', flexDirection: 'column' }}>

            {/* HEADER */}
            <header style={{ background: '#0d1020', borderBottom: '1px solid #1e2540', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56, flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <button onClick={() => setSidebarAberta(s => !s)} style={{ background: 'none', border: 'none', color: '#8892aa', cursor: 'pointer', fontSize: 20, padding: '4px 8px' }}>☰</button>
                    <span style={{ fontWeight: 800, fontSize: 16 }}><span style={{ color: '#c9973e' }}>TEM</span> Defesa</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {user?.email !== ADMIN_EMAIL && !perfil?.is_assinante && (
                        <Link href="/planos" style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 8, background: (perfil?.creditos || 0) <= 0 ? 'rgba(224,80,80,.12)' : 'rgba(201,151,62,.1)', border: `1px solid ${(perfil?.creditos || 0) <= 0 ? 'rgba(224,80,80,.3)' : 'rgba(201,151,62,.25)'}`, fontSize: 12, fontWeight: 700, color: (perfil?.creditos || 0) <= 0 ? '#e05050' : '#c9973e', textDecoration: 'none' }}>
                            🪙 {perfil?.creditos || 0} crédito{(perfil?.creditos || 0) !== 1 ? 's' : ''}
                        </Link>
                    )}
                    {perfil?.is_assinante && <span style={{ fontSize: 12, padding: '5px 12px', borderRadius: 8, background: 'rgba(201,151,62,.1)', color: '#c9973e', fontWeight: 700 }}>👑 Assinante</span>}
                    {user?.email === ADMIN_EMAIL && <span style={{ fontSize: 12, padding: '5px 12px', borderRadius: 8, background: 'rgba(90,170,240,.1)', color: '#5aaaf0', fontWeight: 700 }}>👨‍💻 Admin</span>}
                    <span style={{ fontSize: 13, color: '#8892aa' }}>{perfil?.nome?.split(' ')[0] || user?.email}</span>
                    <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/'; }} style={{ padding: '6px 14px', borderRadius: 8, fontSize: 13, background: 'transparent', border: '1px solid #2a304a', color: '#8892aa', cursor: 'pointer' }}>Sair</button>
                </div>
            </header>

            <div style={{ display: 'flex', flex: 1 }}>

                {/* SIDEBAR */}
                {sidebarAberta && (
                    <aside style={{ width: 240, background: '#0d1020', borderRight: '1px solid #1e2540', padding: '20px 0', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
                        {[
                            { icon: '➕', label: 'Nova Defesa', action: reiniciar },
                            { icon: '📋', label: 'Histórico', action: () => setHistoricoAberto(h => !h) },
                        ].map(({ icon, label, action }) => (
                            <button key={label} onClick={action} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 20px', background: 'none', border: 'none', color: '#c0cce0', cursor: 'pointer', fontSize: 14, textAlign: 'left', width: '100%' }}>
                                <span>{icon}</span> {label}
                            </button>
                        ))}
                        <div style={{ margin: '12px 16px', height: 1, background: '#1e2540' }} />
                        <Link href="/planos" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 20px', color: '#c9973e', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>💳 Comprar Créditos</Link>
                        <Link href="/como-recorrer" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 20px', color: '#8892aa', fontSize: 13, textDecoration: 'none' }}>⚖️ Como Recorrer</Link>
                    </aside>
                )}

                {/* CONTEÚDO PRINCIPAL */}
                <main style={{ flex: 1, padding: '32px 24px', maxWidth: 860, margin: '0 auto', width: '100%' }}>

                    {/* Histórico */}
                    {historicoAberto && (
                        <div style={{ marginBottom: 28, background: '#111526', border: '1px solid #1e2540', borderRadius: 14, padding: '20px 22px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>📋 Histórico de Defesas</h3>
                                <button onClick={() => setHistoricoAberto(false)} style={{ background: 'none', border: 'none', color: '#8892aa', cursor: 'pointer', fontSize: 18 }}>✕</button>
                            </div>
                            {defesas.length === 0
                                ? <p style={{ color: '#8892aa', fontSize: 13 }}>Ainda não gerou nenhuma defesa.</p>
                                : defesas.map((d: any) => (
                                    <div key={d.id} style={{ borderTop: '1px solid #1e2540', paddingTop: 12, marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                                        <div>
                                            <p style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 600 }}>{d.dados_auto?.infracao || 'Contraordenação'} — {d.dados_auto?.matricula || '—'}</p>
                                            <p style={{ margin: 0, fontSize: 12, color: '#8892aa' }}>{new Date(d.created_at).toLocaleDateString('pt-PT')} · {d.dados_auto?.autoridade || '—'}</p>
                                        </div>
                                        <button onClick={() => { setDefesaGerada(d.texto_defesa_final || ''); setDadosAuto(d.dados_auto || {}); setPasso('concluido'); setHistoricoAberto(false); }} style={{ padding: '6px 14px', borderRadius: 8, fontSize: 12, background: 'rgba(201,151,62,.12)', border: '1px solid rgba(201,151,62,.3)', color: '#c9973e', cursor: 'pointer' }}>
                                            Ver defesa
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    )}

                    {/* INDICADOR DE PASSOS */}
                    {passo !== 'concluido' && passo !== 'fora_escopo' && (
                        <div style={{ display: 'flex', gap: 6, marginBottom: 28, alignItems: 'center' }}>
                            {passosVisiveis.map((p, i) => {
                                const ativo = p === passo;
                                const feito = passosVisiveis.indexOf(p) < passosVisiveis.indexOf(passo as Passo);
                                return (
                                    <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        {i > 0 && <div style={{ width: 24, height: 1, background: feito ? '#c9973e' : '#2a304a' }} />}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: feito ? '#c9973e' : ativo ? 'rgba(201,151,62,.2)' : '#151b2e', border: `1.5px solid ${ativo || feito ? '#c9973e' : '#2a304a'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: feito ? '#0b0e18' : ativo ? '#c9973e' : '#4a5060' }}>
                                                {feito ? '✓' : i + 1}
                                            </div>
                                            <span style={{ fontSize: 12, color: ativo ? '#f0ebe0' : feito ? '#c9973e' : '#4a5060', fontWeight: ativo ? 600 : 400 }}>{passoLabels[p]}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {erro && (
                        <div style={{ marginBottom: 20, padding: '12px 16px', borderRadius: 10, background: 'rgba(224,80,80,.1)', border: '1px solid rgba(224,80,80,.25)', color: '#e05050', fontSize: 13 }}>
                            ⚠️ {erro}
                        </div>
                    )}

                    {/* PASSO 1: UPLOAD */}
                    {passo === 'upload' && (
                        <div style={{ background: '#111526', border: '1px solid #1e2540', borderRadius: 16, padding: '32px 24px' }}>
                            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>📄 Carregue o auto de contraordenação</h2>
                            <p style={{ color: '#8892aa', fontSize: 13, marginBottom: 24 }}>Aceita imagem (JPG, PNG) ou PDF. A IA extrai os dados automaticamente.</p>
                            <div onClick={() => fileRef.current?.click()} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFicheiro(f); }} style={{ border: '2px dashed #2a304a', borderRadius: 12, padding: '40px 24px', textAlign: 'center', cursor: 'pointer', background: '#0d1020' }} onMouseEnter={e => (e.currentTarget.style.borderColor = '#c9973e')} onMouseLeave={e => (e.currentTarget.style.borderColor = '#2a304a')}>
                                {ficheiro ? <><p style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>✅ {ficheiro.name}</p><p style={{ fontSize: 12, color: '#8892aa' }}>Clique para substituir</p></> : <><p style={{ fontSize: 32, marginBottom: 10 }}>📎</p><p style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Arrastar o ficheiro aqui ou clicar para selecionar</p><p style={{ fontSize: 12, color: '#8892aa' }}>JPG, PNG ou PDF · máx. 10 MB</p></>}
                            </div>
                            <input ref={fileRef} type="file" accept="image/*,.pdf" style={{ display: 'none' }} onChange={e => { if (e.target.files?.[0]) handleFicheiro(e.target.files[0]); }} />
                            {preview && ficheiro?.type.startsWith('image/') && <img src={preview} alt="Pré-visualização" style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 8, marginTop: 16, objectFit: 'contain', border: '1px solid #2a304a' }} />}
                            {user?.email !== ADMIN_EMAIL && !perfil?.is_assinante && (
                                <div style={{ marginTop: 16, background: 'rgba(201,151,62,.06)', border: '1px solid rgba(201,151,62,.2)', borderRadius: 10, padding: '11px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                                    <p style={{ fontSize: 13, color: '#8892aa', margin: 0 }}>🤖 Extrair com IA desconta <strong style={{ color: '#f0ebe0' }}>1 crédito</strong> · Saldo: <strong style={{ color: (perfil?.creditos || 0) > 0 ? '#c9973e' : '#e05050' }}>{perfil?.creditos || 0}</strong></p>
                                    {(perfil?.creditos || 0) <= 0 && <Link href="/planos" style={{ fontSize: 12, fontWeight: 700, color: '#c9973e', textDecoration: 'none' }}>Comprar créditos →</Link>}
                                </div>
                            )}
                            <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
                                <button onClick={extrairDados} disabled={!ficheiro || uploadLoading} style={{ flex: 1, minWidth: 160, padding: '12px 20px', borderRadius: 10, background: '#c9973e', color: '#0b0e18', fontWeight: 700, fontSize: 14, border: 'none', cursor: ficheiro && !uploadLoading ? 'pointer' : 'not-allowed', opacity: !ficheiro || uploadLoading ? .6 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                    {uploadLoading ? <><span className="spinner" style={{ borderTopColor: '#0b0e18', borderColor: 'rgba(0,0,0,.2)' }} /> A extrair dados...</> : '🤖 Extrair dados com IA — 1 crédito'}
                                </button>
                                <button onClick={() => { setDadosAuto({}); setPasso('confirmar'); }} style={{ padding: '12px 20px', borderRadius: 10, background: 'transparent', border: '1px solid #2a304a', color: '#8892aa', fontSize: 14, cursor: 'pointer' }}>Preencher manualmente</button>
                            </div>
                        </div>
                    )}

                    {/* PASSO 2: CONFIRMAR DADOS */}
                    {passo === 'confirmar' && (
                        <div style={{ background: '#111526', border: '1px solid #1e2540', borderRadius: 16, padding: '32px 24px' }}>
                            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>✏️ Confirme os dados do auto</h2>
                            <p style={{ color: '#8892aa', fontSize: 13, marginBottom: 24 }}>Verifique e corrija os campos extraídos pela IA se necessário.</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                {[
                                    { label: 'Autoridade', key: 'autoridade', placeholder: 'ANSR / GNR / PSP / Câmara' },
                                    { label: 'N.º do Auto', key: 'numeroAuto', placeholder: 'Ex: 10/2025/123456' },
                                    { label: 'Data da Infração', key: 'data', placeholder: 'AAAA-MM-DD', type: 'date' },
                                    { label: 'Hora', key: 'hora', placeholder: 'HH:MM' },
                                    { label: 'Matrícula', key: 'matricula', placeholder: 'Ex: 50-AB-12' },
                                    { label: 'Veículo (Marca/Modelo)', key: 'marca', placeholder: 'Ex: Volkswagen Golf' },
                                    { label: 'Local da Infração', key: 'local', placeholder: 'Rua / Estrada / IP...' },
                                    { label: 'Localidade', key: 'localidade', placeholder: 'Ex: Lisboa' },
                                ].map(({ label, key, placeholder, type }) => (
                                    <div key={key}>
                                        <label style={LS}>{label}</label>
                                        <input style={IS} type={type || 'text'} value={dadosAuto[key] || ''} placeholder={placeholder} onChange={e => setDadosAuto((d: any) => ({ ...d, [key]: e.target.value }))} />
                                    </div>
                                ))}
                                <div style={{ gridColumn: '1/-1' }}>
                                    <label style={LS}>Descrição da Infração</label>
                                    <input style={IS} value={dadosAuto.infracao || ''} placeholder="Ex: Excesso de velocidade, uso de telemóvel..." onChange={e => setDadosAuto((d: any) => ({ ...d, infracao: e.target.value }))} />
                                </div>
                                <div style={{ gridColumn: '1/-1' }}>
                                    <label style={LS}>Artigo infringido (CE/RGCO)</label>
                                    <input style={IS} value={dadosAuto.artigoLE || ''} placeholder="Ex: Art. 27.º-A, n.º 2 do CE" onChange={e => setDadosAuto((d: any) => ({ ...d, artigoLE: e.target.value }))} />
                                </div>
                                <div style={{ gridColumn: '1/-1' }}>
                                    <label style={LS}>Detalhes técnicos <span style={{ fontWeight: 400, opacity: .7 }}>(velocidade, equipamento, etc.)</span></label>
                                    <input style={IS} value={dadosAuto.detalhes || ''} placeholder="Ex: 95 km/h em zona de 50 km/h, radar fixo" onChange={e => setDadosAuto((d: any) => ({ ...d, detalhes: e.target.value }))} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                                <button onClick={() => setPasso('upload')} style={{ padding: '12px 20px', borderRadius: 10, background: 'transparent', border: '1px solid #2a304a', color: '#8892aa', fontSize: 14, cursor: 'pointer' }}>← Voltar</button>
                                <button onClick={handleAnalisarAuto} disabled={!dadosAuto.autoridade || !dadosAuto.infracao || analisando} style={{ flex: 1, padding: '12px 20px', borderRadius: 10, background: '#c9973e', color: '#0b0e18', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', opacity: !dadosAuto.autoridade || !dadosAuto.infracao || analisando ? .5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                    {analisando ? <><span className="spinner" style={{ borderTopColor: '#0b0e18', borderColor: 'rgba(0,0,0,.2)' }} /> A analisar...</> : 'Continuar — Responder Perguntas →'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* PASSO 3: FORA DO ÂMBITO */}
                    {passo === 'fora_escopo' && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '2rem', textAlign: 'center' }}>
                            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(224,80,80,.1)', border: '2px solid rgba(224,80,80,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>⚠</div>
                            <div>
                                <h2 style={{ color: '#e05050', margin: '0 0 12px', fontSize: '1.4rem' }}>Conteúdo fora do âmbito</h2>
                                <p style={{ color: '#8892aa', maxWidth: 480, lineHeight: 1.6, margin: '0 auto 8px' }}>{analise?.mensagem}</p>
                                <p style={{ color: '#8892aa', maxWidth: 480, lineHeight: 1.6, margin: '0 auto', fontSize: 14 }}>
                                    Esta plataforma destina-se exclusivamente a <strong style={{ color: '#c9973e' }}>defesas de coimas de trânsito em Portugal</strong>, ao abrigo do Código da Estrada e do RGCO. Pedidos ilegais, ofensivos ou de outros âmbitos não são processados.
                                </p>
                            </div>
                            <p style={{ color: '#8892aa', fontSize: 14, margin: 0 }}>Pretende reiniciar com uma contraordenação rodoviária?</p>
                            <button onClick={reiniciar} style={{ padding: '14px 32px', background: '#c9973e', color: '#0b0e18', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Reiniciar</button>
                        </div>
                    )}

                    {/* PASSO 3: ENTREVISTA EM CHAT */}
                    {passo === 'entrevista' && analise && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                            {/* Cabeçalho */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <button onClick={() => setPasso('confirmar')} style={{ background: 'transparent', border: '1px solid #2a304a', color: '#8892aa', padding: '8px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>← Voltar</button>
                                <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>⚖️ Entrevista Guiada</h2>
                            </div>

                            {/* Card da infração detetada */}
                            <div style={{ background: '#111526', borderRadius: 12, padding: '1.5rem', border: '1px solid #c9973e' }}>
                                <p style={{ fontSize: 11, color: '#c9973e', textTransform: 'uppercase', margin: '0 0 6px', fontWeight: 700 }}>Contraordenação identificada</p>
                                <p style={{ fontWeight: 600, margin: '0 0 1rem' }}>{analise.resumo_infracao}</p>
                                <p style={{ fontSize: 11, color: '#8892aa', textTransform: 'uppercase', margin: '0 0 6px', fontWeight: 700 }}>Possíveis argumentos de defesa</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                    {analise.estrategias_possiveis?.map((e, i) => (
                                        <span key={i} style={{ background: 'rgba(201,151,62,.12)', color: '#c9973e', padding: '4px 10px', borderRadius: 20, fontSize: 12 }}>{e}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Barra de progresso */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ flex: 1, height: 4, background: '#2a304a', borderRadius: 2, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', background: '#c9973e', borderRadius: 2, width: `${((respostasChat.length) / (analise.perguntas?.length || 1)) * 100}%`, transition: 'width 0.3s ease' }} />
                                </div>
                                <span style={{ fontSize: 12, color: '#8892aa', whiteSpace: 'nowrap' }}>{respostasChat.length} de {analise.perguntas?.length || 0} perguntas</span>
                            </div>

                            {/* Chat */}
                            <div style={{ background: '#0d1020', borderRadius: 12, border: '1px solid #2a304a', display: 'flex', flexDirection: 'column', minHeight: 400, maxHeight: 520, overflow: 'hidden' }}>

                                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {respostasChat.map((r, i) => (
                                        <div key={i}>
                                            <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                                                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c9973e', color: '#0b0e18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>IA</div>
                                                <div style={{ background: '#111526', borderRadius: '12px 12px 12px 0', padding: '12px 16px', maxWidth: '80%', fontSize: 14, lineHeight: 1.5 }}>
                                                    {analise.perguntas?.[i]?.texto || r.pergunta}
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <div style={{ background: 'rgba(201,151,62,.15)', border: '1px solid rgba(201,151,62,.3)', borderRadius: '12px 12px 0 12px', padding: '10px 16px', maxWidth: '70%', fontSize: 14, color: '#e0c97f' }}>{r.resposta}</div>
                                            </div>
                                        </div>
                                    ))}

                                    {!todasRespondidas && perguntaCorrente && (
                                        <div style={{ display: 'flex', gap: 10 }}>
                                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c9973e', color: '#0b0e18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>IA</div>
                                            <div style={{ background: '#111526', borderRadius: '12px 12px 12px 0', padding: '12px 16px', maxWidth: '80%' }}>
                                                <p style={{ fontSize: 14, lineHeight: 1.5, margin: '0 0 6px' }}>{perguntaCorrente.texto}</p>
                                                {perguntaCorrente.relevancia && <p style={{ fontSize: 11, color: '#8892aa', margin: 0, fontStyle: 'italic' }}>{perguntaCorrente.relevancia}</p>}
                                            </div>
                                        </div>
                                    )}

                                    {todasRespondidas && (
                                        <div style={{ display: 'flex', gap: 10 }}>
                                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c9973e', color: '#0b0e18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>IA</div>
                                            <div style={{ background: '#111526', borderRadius: '12px 12px 12px 0', padding: '12px 16px', maxWidth: '80%', fontSize: 14, lineHeight: 1.5 }}>
                                                Muito bem! Recolhi todas as informações necessárias. Clique em <strong style={{ color: '#c9973e' }}>Gerar Defesa</strong> para que eu elabore o documento completo com base nas suas respostas.
                                            </div>
                                        </div>
                                    )}

                                    <div ref={chatEndRef} />
                                </div>

                                {/* Input de resposta */}
                                {!todasRespondidas && perguntaCorrente && (
                                    <div style={{ borderTop: '1px solid #2a304a', padding: '1rem 1.5rem' }}>
                                        {perguntaCorrente.tipo === 'boolean' ? (
                                            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                                <button onClick={() => handleResponder(perguntaCorrente.opcao_sim || 'Sim')} style={{ flex: 1, minWidth: 100, padding: '12px', background: 'rgba(74,170,106,.1)', border: '1px solid rgba(74,170,106,.4)', color: '#4aaa6a', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                                                    {perguntaCorrente.opcao_sim || 'Sim'}
                                                </button>
                                                <button onClick={() => handleResponder(perguntaCorrente.opcao_nao || 'Não')} style={{ flex: 1, minWidth: 100, padding: '12px', background: 'rgba(224,80,80,.1)', border: '1px solid rgba(224,80,80,.4)', color: '#e05050', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                                                    {perguntaCorrente.opcao_nao || 'Não'}
                                                </button>
                                                <button onClick={() => handleResponder('Não sei informar')} style={{ flex: 1, minWidth: 130, padding: '12px', background: 'rgba(136,146,170,.1)', border: '1px solid rgba(136,146,170,.3)', color: '#8892aa', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                                                    Não sei informar
                                                </button>
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex', gap: 10 }}>
                                                <textarea value={respostaInput} onChange={e => setRespostaInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleResponder(respostaInput); } }} rows={2} placeholder="Escreva a sua resposta... (Enter para enviar)" style={{ flex: 1, padding: '12px', borderRadius: 8, background: '#111526', border: '1px solid #2a304a', color: '#f0ebe0', resize: 'none', fontSize: 14, fontFamily: 'inherit' }} />
                                                <button onClick={() => handleResponder(respostaInput)} disabled={!respostaInput.trim()} style={{ padding: '12px 20px', background: '#c9973e', color: '#0b0e18', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700, alignSelf: 'flex-end', opacity: !respostaInput.trim() ? .5 : 1 }}>Enviar</button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Aviso + Botão gerar defesa */}
                            {todasRespondidas && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ background: 'rgba(136,146,170,.06)', border: '1px solid #2a304a', borderRadius: 10, padding: '1rem 1.25rem', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                        <span style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>ℹ</span>
                                        <p style={{ fontSize: 13, color: '#8892aa', lineHeight: 1.6, margin: 0 }}>
                                            <strong style={{ color: '#c9973e' }}>Aviso de responsabilidade:</strong> A defesa gerada baseia-se exclusivamente nas informações e documentos fornecidos por si. A veracidade dos dados indicados é da sua inteira responsabilidade. Esta plataforma não substitui o aconselhamento de um advogado habilitado.
                                        </p>
                                    </div>
                                    <button onClick={gerarDefesa} disabled={gerandoDefesa} style={{ width: '100%', padding: '18px', background: '#c9973e', color: '#0b0e18', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: '1.05rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                        {gerandoDefesa ? <><span className="spinner" style={{ borderTopColor: '#0b0e18', borderColor: 'rgba(0,0,0,.2)' }} /> A elaborar defesa...</> : '⚖️ Gerar Defesa Agora'}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* CONCLUÍDO */}
                    {passo === 'concluido' && defesaGerada && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div style={{ background: 'rgba(74,170,106,.1)', border: '1px solid rgba(74,170,106,.25)', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontSize: 24 }}>✅</span>
                                <div>
                                    <p style={{ margin: '0 0 2px', fontWeight: 700, fontSize: 15, color: '#4aaa6a' }}>Defesa gerada com sucesso</p>
                                    <p style={{ margin: 0, fontSize: 13, color: '#8892aa' }}>Reveja o documento e transfira-o para submeter à autoridade autuante.</p>
                                </div>
                            </div>

                            <div style={{ background: '#111526', border: '1px solid #1e2540', borderRadius: 16, padding: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
                                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>📄 Defesa Administrativa</h3>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button onClick={transferirDefesa} style={{ padding: '8px 18px', borderRadius: 8, background: '#c9973e', color: '#0b0e18', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer' }}>⬇️ Transferir .txt</button>
                                        <button onClick={reiniciar} style={{ padding: '8px 18px', borderRadius: 8, background: 'transparent', border: '1px solid #2a304a', color: '#8892aa', fontSize: 13, cursor: 'pointer' }}>➕ Nova defesa</button>
                                    </div>
                                </div>
                                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: 13, color: '#c0cce0', lineHeight: 1.7, maxHeight: 500, overflowY: 'auto', margin: 0, padding: '16px', background: '#0d1020', borderRadius: 10, border: '1px solid #1e2540' }}>
                                    {defesaGerada}
                                </pre>
                            </div>

                            <div style={{ background: '#111526', border: '1px solid rgba(201,151,62,.2)', borderRadius: 12, padding: '16px 20px' }}>
                                <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: 14, color: '#c9973e' }}>⚠️ Como submeter a defesa</p>
                                <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 13, color: '#8892aa', lineHeight: 1.8 }}>
                                    <li><strong>Prazo:</strong> 15 dias úteis a contar da data de notificação do auto</li>
                                    <li><strong>Online:</strong> Portal ePortugal.gov.pt → ANSR → Defesa/Impugnação</li>
                                    <li><strong>Correio:</strong> Carta registada com aviso de receção para a ANSR ou autoridade autuante</li>
                                    <li><strong>Presencialmente:</strong> Balcão da entidade autuante (ANSR, GNR, PSP, Câmara)</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {sidebarAberta && <div onClick={() => setSidebarAberta(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 90 }} />}
        </div>
    );
}
